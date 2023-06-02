import _                 from 'lodash';
import React             from 'react';
import {useEffect}       from 'react';
import {useState}        from 'react';
import {useSelector}     from 'react-redux';
import useConfig         from 'src/components/useConfig';
// import {useAppDispatch}  from 'src/store';
import Grid              from '@mui/material/Unstable_Grid2';
import {Hidden}          from '@mui/material';
import {LinearProgress}  from '@mui/material';
import {Paper}           from '@mui/material';
import {Typography}      from '@mui/material';
import {effects}         from 'src/shared/styles';
import {fonts}           from 'src/shared/styles';
import {images}          from 'src/shared/styles';
import Page              from 'src/components/page';
import paletteColors     from 'src/theme/paletteColors';
import {DrawNotchedLine} from './components/pickup-parts/draw-pickup';
import {useAppDispatch}  from 'src/store';
import {apiGetOrderById} from 'src/store/orders';
import {clearOrder}      from 'src/store/orders';

import {clearBasket} from '../../store/basket';
import {jumpTo}      from '../content/drawSection';

import {DrawCheckoutFlowHeaderRow} from './components/header-row/checkout-flow-header';
import {useParams}                 from 'react-router-dom';

export interface IDeliveryProps
{
    orderNumber?: string;
    currentStage: string;
    percentComplete: number;
}

function DrawStage(props: IDeliveryProps): React.ReactElement {
    const {orderNumber, currentStage, percentComplete} = props;
    return (
        <Grid container width={'100%'}>
            <Grid xs={12} my={2}>
                <LinearProgress
                    sx={{
                        ...effects.buttonShadow,
                        backgroundColor            : paletteColors.white,
                        borderRadius               : '23px',
                        height                     : '24px',
                        width                      : '50%',
                        '& .MuiLinearProgress-bar' : {
                            backgroundColor : paletteColors.oportoOrange
                        }
                    }}
                    variant="determinate"
                    value={percentComplete}
                />
            </Grid>

            <Grid xs={12} sx={{fontWeight : '700'}}>
                {currentStage}
            </Grid>
        </Grid>
    );
}

export function DeliveryPage() {
    const config   = useConfig();
    const dispatch = useAppDispatch();

    const props   = useParams();
    const orderId = props.orderId || '';


    // const basketState = useSelector((state: any) => state.basket);
    const ordersState = useSelector((state: any) => state.orders);
    // const {currentCustomer} = useSelector((state: any) => state.customer);
    // const {currentStore}    = useSelector((state: any) => state.stores);


    /** SET THE STAGE HERE **/
    const currentStage                            = 'Firing up the grill...';
    const percentageComplete                      = 10;
    /** ~~~~~~~~~~~~~~~~~ **/

    const [activeStage, setActiveStage]           = useState(currentStage);
    const [activeCompletion, setActiveCompletion] = useState(percentageComplete);

    const [pickupTime, setPickupTime] = useState('');

    const [orderStatus, setOrderStatus]               = useState<string>('Getting status...');
    const [orderStatusMessage, setOrderStatusMessage] = useState<string>('High five! We’ve received your order and it will be ready soon.');

    // //#region Get rid of this bit once you are passing active stages
    // /** You can turf this bit, it just makes the interface auto update */
    const stages                  = [
        [25, 'Firing up the grill'],
        [40, 'Flipping the patties'],
        [55, 'Salting the fries'],
        [70, 'Sweetening the chilli'],
        [85, 'Peeling the potatoes']
    ];
    const [stageIdx, setStageIdx] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setActiveStage(`${stages[stageIdx][1]}...`);
            setActiveCompletion(Number(stages[stageIdx][0]));
            setStageIdx(stageIdx + 1);
            if (stageIdx === stages.length - 1) {
                setStageIdx(0);
                //jumpTo(`/status/${orderId}`);
            }
        }, 4000);
    }, [stageIdx, activeStage, activeCompletion]);
    // //#endregion

    const localStyles = {
        root : {
            alignSelf   : 'center',
            justifySelf : 'center',
            width       : '-webkit-fill-available',
            height      : '100%',
            alignItems  : 'center',
            ...fonts.portuguesa,
            fontSize           : '40px',
            '& .MuiGrid2-root' : {
                justifyContent : 'center',
                display        : 'flex'
            }
        }
    };

    const [pollTimeoutId, setPollTimeoutId] = useState<NodeJS.Timer | undefined>(undefined);

    function pollOrderStatus(): void {
        if (_.isEmpty(orderId)) {
            return;
        }

        dispatch(apiGetOrderById({config, orderId}));

        // Queue the next poll action
        setPollTimeoutId(setTimeout(pollOrderStatus, 5000));
    }

    function cleanupPolling(orderInProgress: boolean): void {
        // Cancel polling
        clearTimeout(pollTimeoutId);
        setPollTimeoutId(undefined);

        if (!orderInProgress) {
            // Cleanup any existing order
            dispatch(clearOrder(null));
            dispatch(clearBasket(null));
        }
    }

    //*** region: Poll the order status
    useEffect(() => {
        if (_.isEmpty(orderId)) {
            return;
        }

        const {currentOrder} = ordersState;
        if (_.isEmpty(currentOrder)) {
            if ((currentOrder === null) && !ordersState.loading) {
                dispatch(apiGetOrderById({config, orderId}));
            }

            return;
        }

        const orderInProgress = ![
            'BASKET_ACCEPTED', // accepted by the customer (via pickup) ???
            'BASKET_REJECTED',
            'PAYMENT_REJECTED',
            'DELIVERY_CANCELLED',
            'DELIVERY_COMPLETED'
        ].includes(currentOrder?.status || '');

        if (orderInProgress) {
            pollOrderStatus();
        }
        else {
            cleanupPolling(orderInProgress);
        }

        // Clear the interval on view dismount
        return () => cleanupPolling(orderInProgress);
    }, [config, ordersState, orderId]);
    //*** endregion: Poll the order status


    //*** region: Handle polling updated order status
    useEffect(() => {
        if (_.isEmpty(orderId)) {
            return;
        }

        const {currentOrder} = ordersState;
        if (_.isEmpty(currentOrder)) {
            return;
        }

        switch (currentOrder.status) {
            case 'BASKET_ACCEPTED':
                setOrderStatus('Order Placed');
                setOrderStatusMessage('High five! We’ve received your order and it will be ready soon.');
                setActiveCompletion(100);
                jumpTo(`/status/${orderId}`);
                break;

            case 'BASKET_REJECTED':
                setOrderStatus('Order Failed');
                setOrderStatusMessage('Order has not been successful');
                setActiveCompletion(100);
                jumpTo(`/status/${orderId}`);
                break;

            case 'PAYMENT_REJECTED':
                setOrderStatus('Payment Failed');
                setOrderStatusMessage('Payment has been rejected, please check your details and try again.');
                setActiveCompletion(100);
                jumpTo(`/status/${orderId}`);
                break;

            default:
                // setOrderStatus('Error');
                console.error(new Error(`Unknown order status: ${currentOrder.status}`));
                break;
        }
    }, [ordersState, orderId, pickupTime]);
    //*** endregion: Handle polling updated order status

    return (
        <Page>
            <Grid
                container
                className="theme"
                width="lg"
                justifyContent={'center'}
                display="flex"
                height={"fit-content"}
                sx={{...localStyles.root}}
            >
                <Grid xs={12} className={'theme'} width={'100%'} marginTop={'4px'}>
                    <DrawCheckoutFlowHeaderRow/>
                </Grid>

                <Grid width={'100%'} paddingTop={2} paddingBottom={4}>
                    <Paper
                        sx={{
                            padding      : '24px',
                            paddingLeft  : 0,
                            paddingRight : 0,
                            borderRadius : '14px',
                            lineHeight   : '35px',
                            width        : {xs : '90%', sm : '100%'}
                        }}
                    >
                        <Grid container width={'100%'}>
                            <Grid
                                xs={12}
                                sx={{
                                    fontWeight    : '700',
                                    paddingBottom : '100px',
                                    textAlign     : 'center'
                                }}
                            >
                                {`Your order is on it's way`}
                            </Grid>

                            <Hidden smUp>
                                <DrawNotchedLine/>
                            </Hidden>

                            <Grid xs={12} alignItems={'end'}>
                                <img src={images.brandSpinner} alt="Brand Spinner"/>
                            </Grid>

                            <Grid xs={12} sx={{fontSize : '20px', textAlign : 'center'}}>
                                <DrawStage
                                    currentStage={orderStatus}
                                    percentComplete={activeCompletion}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Page>
    );
}
