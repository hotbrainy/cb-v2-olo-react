import _                            from 'lodash';
import moment                       from 'moment';
import React                        from 'react';
import {useEffect}                  from 'react';
import {useState}                   from 'react';
import {useSelector}                from 'react-redux';
import useConfig                    from 'src/components/useConfig';
import {useAppDispatch}             from 'src/store';
import Grid                         from '@mui/material/Unstable_Grid2';
import {Box}                        from '@mui/material';
import {Paper}                      from '@mui/material';
import {fonts}                      from 'src/shared/styles';
import {images}                     from 'src/shared/styles';
import Page                         from 'src/components/page';
import {DrawNotchedLine}            from './components/pickup-parts/draw-pickup';
import {DrawBasketForReceiptScreen} from './components/basket/basket-parts';
import DeliveryStatus               from './components/status-parts/delivery/delivery-status';
import JumpTag                      from './components/status-parts/jump-tag';
import StoreLocationTag             from './components/status-parts/store-location-tag';
import PickupStatus                 from './components/status-parts/pickup/pickup-status';
import StatusHeader                 from './components/status-parts/status-header';

import {apiGetOrderById} from 'src/store/orders';
import {clearOrder}      from 'src/store/orders';

import {IDeliveryStage} from './components/status-parts/delivery/delivery-status-line';

import {clearBasket} from '../../store/basket';
import {jumpTo}      from '../content/drawSection';
import {useParams}   from 'react-router-dom';


export function OrderStatusPage() {
    const config   = useConfig();
    const dispatch = useAppDispatch();

    const props   = useParams();
    const orderId = props.orderId || '';

    const ordersState       = useSelector((state: any) => state.orders);
    const {currentCustomer} = useSelector((state: any) => state.customer);
    const {currentStore}    = useSelector((state: any) => state.stores);

    const {currentOrder} = ordersState;


    const [orderType, setOrderType]     = useState<OrderType | null>(null);
    const [orderNumber, setOrderNumber] = useState<string | null>(null);
    const [orderDate, setOrderDate]     = useState<string | null>(null);

    /*** region: TODO: implement delivery ??? */
    const yourDriver = 'Bill Gates';
    const driver     = 'Bill Gates';

    const [activeDriver, setActiveDriver] = useState<string | undefined>(undefined);
    /*** endregion: TODO: implement delivery ??? */


    const [orderTimestamp, setOrderTimestamp] = useState(moment().format('ddd h:mma'));

    const [orderStatus, setOrderStatus]               = useState<string>('Getting status...');
    const [orderStatusMessage, setOrderStatusMessage] = useState<string>('High five! We’ve received your order and it will be ready soon.');

    const localStyles = {
        root : {
            alignSelf   : 'center',
            justifySelf : 'center',
            width       : '-webkit-fill-available',
            height      : '100%',
            alignItems  : 'center',
            ...fonts.portuguesa,
            fontSize           : '40px',
            lineHeight         : '40px',
            '& .MuiGrid2-root' : {
                justifyContent : 'center',
                display        : 'flex'
            },
            '& .MuiPaper-root' : {marginBottom : '24px'}
        }
    };

    const [pollTimeoutId, setPollTimeoutId] = useState<NodeJS.Timer | undefined>(undefined);

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    function pollOrderStatus(): void {
        if (_.isEmpty(orderId)) {
            return;
        }

        dispatch(apiGetOrderById({config, orderId}));
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
        if (_.isEmpty(orderNumber) && _.isEmpty(currentOrder)) {
            if (ordersState.error) {
                setErrorMsg(ordersState.error || 'An error occurred');
                cleanupPolling(false);
                return;
            }

            if ((currentOrder === null) && !ordersState.loading) {
                setPollTimeoutId(setTimeout(pollOrderStatus, 5000));
            }

            return;
        }

        if (_.isEmpty(orderNumber)) {
            setOrderType(currentOrder?.basket?.type || null);
            setOrderNumber(_.last((currentOrder?.deliverectId || '').split('-')) || '####');
            setOrderDate(currentOrder?.createdDateTime
                ? moment(currentOrder?.createdDateTime, 'YYYY-MM-DDTHH:mm:ss.zzzZ').format('D MMM Y')
                : ''
            );
        }

        const orderInProgress = !_.isEmpty(currentOrder) && !_.isEmpty(orderId) && ![
            'BASKET_ACCEPTED', // accepted by the customer (via pickup) ???
            'BASKET_REJECTED',
            'PAYMENT_REJECTED',
            'DELIVERY_CANCELLED',
            'DELIVERY_COMPLETED'
        ].includes(currentOrder?.status || '');

        if (orderInProgress) {
            // Queue the next poll action
            setPollTimeoutId(setTimeout(pollOrderStatus, 5000));
        }
        else {
            cleanupPolling(orderInProgress);
        }

        // Clear the interval on view dismount
        return () => cleanupPolling(orderInProgress);
    }, [config, ordersState, currentOrder, orderNumber]);
    //*** endregion: Poll the order status


    //*** region: Handle polling updated order status
    useEffect(() => {
        if (_.isEmpty(currentOrder)) {
            return;
        }

        setOrderTimestamp(moment.utc(currentOrder.basket.placementDateTime).local().format('ddd h:mma'));

        switch (currentOrder.status) {
            case 'PENDING_RELEASE':
                setOrderStatusMessage('High five! We’ve received your order and it will be ready soon.');
                break;

            case 'BASKET_ACCEPTED':
                setOrderStatusMessage('High five! We’ve received your order and it will be ready soon.');
                if (/^collection$/i.test(currentOrder.basket.type || '')) {
                    setOrderStatus('Ready for pickup');
                    setOrderTimestamp(moment.utc(currentOrder.basket.pickupDateTime).local().format('ddd h:mma'));
                }
                else {
                    setOrderStatus('Order Placed');
                    setOrderTimestamp(moment.utc(currentOrder.basket.placementDateTime).local().format('ddd h:mma'));
                }
                break;

            case 'BASKET_REJECTED':
                setOrderStatus('Order Failed');
                setOrderStatusMessage('Order has not been successful');
                break;

            case 'PAYMENT_PENDING':
                setOrderStatus('Processing Payment');
                setOrderStatusMessage('Payment is currently pending');
                break;

            case 'PAYMENT_REJECTED':
                setOrderStatus('Payment Failed');
                setOrderStatusMessage('Payment has been rejected, please check your details and try again.');
                break;

            case 'PROCESSING_BASKET':
                setOrderStatus('Processing');
                setOrderStatusMessage('Processing your Order');
                break;

            case 'DELIVERY_PICKED_UP':
                setOrderStatus('Picked up');
                setOrderStatusMessage('High five! We’ve received your order and it will be ready soon.');
                break;

            case 'DELIVERY_CANCELLED':
                setOrderStatus('Delivery Cancelled');
                setOrderStatusMessage('Delivery Cancelled');
                break;

            case 'DELIVERY_ON_THE_WAY':
                setOrderStatus('Delivery on the way');
                setOrderStatusMessage('High five! We’ve received your order and it will be ready soon.');
                break;

            case 'DASHER_CONFIRMED_PICKUP_ARRIVAL':
                setOrderStatusMessage('High five! We’ve received your order and it will be ready soon.');
                break;

            case 'BAGGING_UP':
                setOrderStatusMessage('High five! We’ve received your order and it will be ready soon.');
                break;

            case 'DELIVERY_COMPLETED':
                setOrderStatus('Complete');
                setOrderStatusMessage('Complete');
                break;

            default:
                // setOrderStatus('Error');
                console.error(new Error(`Unknown order status: ${currentOrder?.status || 'undefined'}`));
                break;
        }
    }, [currentOrder]);
    //*** endregion: Handle polling updated order status

    //#region Get rid of this bit once you are passing active stages
    /** You can turf this bit, it just makes the interface auto update */
    const [deliveryStages, setDeliveryStages] = useState<IDeliveryStage[]>([
        {time : undefined, stage : 'Order Received', status : 'Preparing Your Order'},
        {time : undefined, stage : 'Bagging Up', status : 'Waiting For Driver'},
        {time : undefined, stage : 'Your Driver is En-route', status : 'Out For Delivery'},
        {time : undefined, stage : 'Order Complete', status : 'Delivered'}
    ]);


    return (
        <Page>
            <Grid
                container
                className="theme"
                width="lg"
                justifyContent={'center'}
                display="flex"
                sx={{...localStyles.root}}
            >
                <Grid
                    width={'100%'}
                    paddingTop={2}
                    paddingBottom={4}
                    flexDirection="column"
                    className="justifyGridCenter"
                >
                    <Grid xs={12}>
                        <Paper
                            sx={{
                                padding      : 0,
                                borderRadius : '14px',
                                width        : {xs : '90%', sm : '100%'},
                                alignSelf    : 'center'
                            }}
                        >
                            <Grid container width={'100%'} sx={{padding : {xs : '8px', sm : '12px'}}}>
                                <Grid xs={12}>
                                    <StatusHeader
                                        orderType={orderType}
                                        orderNumber={orderNumber || ' ####'}
                                        orderDate={orderDate || moment().format('DD MMM yyyy')}
                                        status={orderStatus || 'Processing'}/>
                                </Grid>

                                <Grid
                                    xs={12}
                                    sx={{
                                        fontWeight    : '700',
                                        paddingBottom : '24px',
                                        textAlign     : 'center'
                                    }}
                                >
                                    {(/^delivery$/i.test(orderType || ''))
                                        ? (
                                            <DeliveryStatus
                                                orderNumber={orderNumber || ''}
                                                orderDate={orderDate || ''}
                                                status={orderStatusMessage}
                                                stages={deliveryStages}
                                                driver={activeDriver}
                                            />
                                        )
                                        // catering or collection
                                        : (
                                            <PickupStatus
                                                orderNumber={orderNumber || ''}
                                                orderDate={orderDate || ''}
                                                pickupTime={orderTimestamp}
                                                status={orderStatus}
                                                statusMessage={orderStatusMessage}
                                            />
                                        )
                                    }
                                </Grid>
                            </Grid>

                            <Grid container width={'100%'}>
                                <DrawNotchedLine/>
                            </Grid>

                            <Grid container width={'100%'} sx={{padding : {xs : '8px', sm : '12px'}}}>
                                <Grid xs={12} sx={{fontSize : '20px', lineHeight : '22px', textAlign : 'center'}}>
                                    <Grid
                                        xs={12}
                                        sx={{
                                            ...fonts.ceraPro,
                                            fontWeight    : '700',
                                            textAlign     : 'center',
                                            paddingBottom : '16px'
                                        }}
                                        flexDirection={'column'}
                                    >
                                        <Box className="heading">
                                            {`${currentCustomer?.firstName || ''} ${currentCustomer?.lastName || ''}`.trim() || 'Guest'}
                                        </Box>

                                        <StoreLocationTag
                                            currentStore={currentStore}
                                            sxProps={{
                                                paddingTop   : '16px',
                                                fontSize     : {xs : '14px', sm : '20px'},
                                                '& .heading' : {
                                                    fontSize : '20px'
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid
                                    xs={12}
                                    alignItems={'end'}
                                    paddingTop="16px"
                                    paddingBottom="16px"
                                    sx={{
                                        width : {xs : '100%', sm : '50%'}
                                    }}
                                >
                                    <DrawBasketForReceiptScreen
                                        orderItems={currentOrder?.basket?.items || []}
                                        hidePrices={true}
                                        sxProps={{
                                            rowGap             : '10px',
                                            '& .productExtras' : {
                                                fontSize : 'small'
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid xs={12} alignItems={'end'}>
                                    <img src={images.brandSpinner} alt="Brand Spinner"/>
                                </Grid>
                            </Grid>

                            {!_.isEmpty(orderId) && (
                                <Grid xs={12}>
                                    <Box
                                        className="linkText"
                                        sx={{fontSize : {xs : '14px', sm : '24px'}}}
                                        onClick={() => jumpTo(`/receipt/${orderId}`)}>
                                        {`View Receipt`}
                                    </Box>
                                </Grid>
                            )}
                        </Paper>
                    </Grid>

                    <Grid xs={12} width="100%" flexDirection={{xs : 'column', sm : 'row'}}>
                        <Grid xs={12} sm={6} width="100% !important" marginRight={{sm : '8px'}}>
                            <JumpTag text={'Got Feedback'} linkUrl={'/feedback'}/>
                        </Grid>

                        <Grid xs={12} sm={6} width="100% !important" marginLeft={{sm : '8px'}}>
                            <JumpTag text={'Need Help'} linkUrl={'/contact-us'}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Page>
    );
}
