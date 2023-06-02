import _                from 'lodash';
import React            from 'react';
import {useEffect}      from 'react';
import {useState}       from 'react';
import {useSelector}    from 'react-redux';
import useConfig        from 'src/components/useConfig';
import {useAppDispatch} from 'src/store';

import Grid         from '@mui/material/Unstable_Grid2';
import {Hidden}     from '@mui/material';
import {Typography} from '@mui/material';
import {Paper}      from '@mui/material';
import {fonts}      from 'src/shared/styles';
import Page         from 'src/components/page';

import HeartRow            from './components/status-parts/heart-row';
import {DrawNotchedLine}   from './components/pickup-parts/draw-pickup';
import {DrawPickup}        from './components/pickup-parts/draw-pickup';
import {DrawPickupGraphic} from './components/pickup-parts/draw-pickup';

import {apiGetOrderById}  from '../../store/orders';
import {apiNotifyIamhere} from '../../store/orders';
import {jumpTo}           from '../content/drawSection';
import {useParams}        from 'react-router-dom';
import spinnerImage       from '../../assets/images/spinner.gif';

export function PickupPage(): React.ReactElement {
    const config   = useConfig();
    const dispatch = useAppDispatch();

    const props   = useParams();
    const orderId = props.orderId || '';

    const ordersState = useSelector((state: any) => state.orders);

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [firstName, setFirstName]                 = useState<string | null>(null);
    const [estimatedCookTime, setEstimatedCookTime] = useState<string | null>(null);

    const [isCooking, setIsCooking] = useState<boolean>(false);


    /** Fires when the slide to cook happens
     * startNow is return as true (cook) false (not cook)
     */
    function startCooking(startNow: boolean) {
        console.log('start cooking: ', startNow);
        setIsCooking(startNow);

        if (startNow && orderId && !ordersState.loading) {
            dispatch(apiNotifyIamhere({config, orderId}));
        }
    }


    useEffect(() => {
        if (_.isEmpty(ordersState.currentOrder)) {
            if ((ordersState.currentOrder === null) && !ordersState.loading) {
                if (ordersState.error) {
                    setErrorMsg(ordersState.error || 'An error occurred');
                    return;
                }

                dispatch(apiGetOrderById({config, orderId}));
            }

            return;
        }

        // TODO: review this... may need to consider other status values
        if (ordersState.currentOrder.status !== 'PENDING_RELEASE') {
            jumpTo(`/status/${orderId}`);
            return;
        }

        // Populate screen info
        const prepMinutes = ordersState.currentOrder.prepTimeMinutes || 10;
        setEstimatedCookTime(`${prepMinutes} minutes`);
        setFirstName(ordersState.currentOrder.customer.firstName || 'Guest');
    }, [config, ordersState]);

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

    const [slideValue, setSlideValue] = useState(0);
    const changeSlideValue            = (newValue: number) => {
        setSlideValue(newValue);
    };

    return (
        <Page>
            <Grid
                container
                className="theme"
                width="lg"
                justifyContent={'center'}
                display="flex"
                sx={localStyles.root}
            >
                <Grid width={'100%'} paddingTop={3} paddingBottom={5}>
                    <Paper
                        sx={{
                            paddingTop    : '24px',
                            paddingBottom : '24px',
                            borderRadius  : '14px',
                            width         : {xs : '90%', sm : '95%', md : '97%', lg : '100%'}
                        }}
                    >
                        {_.isEmpty(ordersState.currentOrder)
                            ? (
                                errorMsg
                                    ? (
                                        // TODO: render a pretty error UI
                                        <Grid container width={'100%'}>
                                            <Grid xs={12}>
                                                <Typography
                                                    variant={'h6'}
                                                    color={(theme) => theme.palette.common.red}
                                                    sx={{
                                                        fontSize : {xs : '12px', sm : '20px'}
                                                    }}
                                                >
                                                    {errorMsg}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    )
                                    : (
                                        // NOTE: taken from LoadingSpinner component
                                        // TODO: render a pretty loading spinner
                                        <Grid container width={'100%'}>
                                            <Grid xs={12}>
                                                <img
                                                    src={spinnerImage}
                                                    alt={''}
                                                    width={50}
                                                    height={50}
                                                />
                                                <Typography variant={'h6'} sx={{fontSize : {xs : '12px', sm : '20px'}}}>
                                                    {'Loading...'}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    )
                            )
                            : (
                                <Grid container width={'100%'}>
                                    <Grid xs={12} paddingLeft={2} paddingRight={2} flexDirection={'column'}>
                                        <Grid
                                            xs={12}
                                            sx={{
                                                fontWeight     : '700',
                                                lineHeight     : '35px',
                                                justifyContent : 'center',
                                                textAlign      : 'center'
                                            }}
                                        >
                                            {`We're almost there, ${firstName}!`}
                                        </Grid>

                                        <HeartRow/>

                                        <Grid xs={12} sx={{fontSize : isCooking ? '25px' : '14px', ...fonts.matter, padding : '24px'}}>
                                            {isCooking ? 'Firing up the grill...' : `We wont start cooking your food until you slide to start cooking below.`}
                                        </Grid>
                                    </Grid>

                                    <Hidden smUp>
                                        <DrawNotchedLine/>
                                    </Hidden>

                                    <Grid
                                        xs={12}
                                        paddingLeft={2}
                                        paddingRight={2}
                                        flexDirection={'column'}
                                    >
                                        <Grid
                                            xs={12}
                                            height="75px"
                                            alignItems={'end'}
                                            justifyContent="center"
                                            alignSelf="center"
                                            width={{xs : '100%', sm : '100%', lg : '50%'}}
                                        >
                                            <DrawPickupGraphic isCooking={isCooking} slidePosition={slideValue}/>
                                        </Grid>

                                        <Grid xs={12} width={{xs : '100%', sm : '100%'}}>
                                            <DrawPickup
                                                estimatedCookTime={estimatedCookTime || ''}
                                                onSlideChange={changeSlideValue}
                                                onStart={startCooking}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Page>
    );
}
