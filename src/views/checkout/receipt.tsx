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
import {Skeleton}                   from '@mui/material';
import {Paper}                      from '@mui/material';
import {fonts}                      from 'src/shared/styles';
import {images}                     from 'src/shared/styles';
import Page                         from 'src/components/page';
import {DrawBasketForReceiptScreen} from './components/basket/basket-parts';

import {useParams} from 'react-router-dom';

import {DrawCheckoutFlowHeaderRow} from './components/header-row/checkout-flow-header';

import paperTearTop            from 'src/assets/images/adornments/paperTear.png';
import paperTearBottom         from 'src/assets/images/adornments/paperTearBottom.png';
import {guid}                  from 'src/utils/utils';
import {receiptStyles}         from './components/receipt-parts/styles';
import {getAddressLines}       from './components/receipt-parts/utils';
import {getCardImage}          from './components/receipt-parts/utils';
import {getOrderType}          from './components/receipt-parts/utils';
import {apiGetOrderById}       from 'src/store/orders';
import {getSubTotalAsCurrency} from '../menu/components/utils';

function DrawAddressBlock(props: { addressLines: string[] }): React.ReactElement {
    return (
        <>
            {(props.addressLines || []).map((line: string) => (
                <Grid key={guid()} flex={1}>
                    {line || ''}
                </Grid>
            ))
            }
        </>
    );
}

export function ReceiptPage() {
    const props   = useParams();
    const orderId = props.orderId || '';

    const config   = useConfig();
    const dispatch = useAppDispatch();

    const [order, setOrder] = useState<IOrder | null>(null);

    const ordersState = useSelector((state: any) => state.orders);

    //TODO maybe chuck this and use the date from the returned order
    const [orderDate, setOrderDate] = useState<string>('');
    const [total, setTotal]         = useState(0);
    //TODO - call the APi and drag the order from the ether

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        // we have receiptId passed in from the url /receipt/:receiptId
        if (_.isEmpty(orderId)) {
            return;
        }

        const currentOrder = ordersState.currentOrder;
        if (_.isEmpty(currentOrder)) {
            if ((currentOrder === null) && !ordersState.loading) {
                if (ordersState.error) {
                    setErrorMsg(ordersState.error || 'An error occurred');
                    return;
                }

                dispatch(apiGetOrderById({config, orderId}));
            }

            return;
        }

        setOrder(currentOrder);
        setOrderDate(moment(currentOrder?.createdDateTime, 'YYYY-MM-DDTHH:mm:ss.zzzZ').format('MMM DD YYYY'));
        setTotal(currentOrder.basket?.total || 0);
    }, [config, ordersState, orderId]);


    return (
        <Page>
            <Grid
                container
                className="theme"
                width="lg"
                display="flex"
                flexDirection={'column'}
                height={'fit-content'}
                sx={{...receiptStyles.root}}
            >
                <Grid
                    xs={12} flex={1}
                    className={'theme'}
                    width={'100%'}
                    marginTop={'4px'}
                    justifyContent={'flex-start !important'}
                >
                    <DrawCheckoutFlowHeaderRow/>
                </Grid>

                <Grid xs={12} flex={1} mt={1} width={'100%'}
                      sx={{
                          ...receiptStyles.paperTear,
                          backgroundImage : `url(${paperTearTop})`
                      }}
                >{' '}
                </Grid>

                <Grid
                    width={'100%'}
                    flex={1}
                    paddingTop={0}
                    flexDirection="column"
                    className="justifyGridCenter"
                    zIndex={1}
                >
                    <Paper
                        sx={{
                            padding       : 0,
                            paddingTop    : {xs : '8px', sm : '24px'},
                            paddingBottom : '24px',
                            borderRadius  : '0px',
                            width         : {xs : '90%', sm : '100%'},
                            alignSelf     : 'center'
                        }}
                    >
                        <Grid container width={'100%'} flexDirection={'column'} sx={{padding : {xs : '8px', sm : '12px'}}}>
                            <Grid
                                xs={12}
                                sx={{
                                    ...receiptStyles.section,
                                    justifyContent : 'center'
                                }}
                            >
                                <img src={images.brandLogo} alt="Chicken Treat Logo"/>
                            </Grid>

                            <Grid
                                xs={12}
                                sx={{
                                    ...receiptStyles.section,
                                    ...fonts.ceraBlack,
                                    justifyContent : 'center'
                                }}
                                className={'bigHead'}
                            >
                                Thanks for your order!
                            </Grid>

                            <Grid
                                xs={12}
                                sx={{
                                    ...receiptStyles.section,
                                    justifyContent : 'center',
                                    flexDirection  : 'column'
                                }}
                            >
                                <Box className="smallHead">
                                    {order
                                        ? (`${order.customer.firstName || ''} ${order.customer.lastName}`.trim() || 'N/A')
                                        : (
                                            <Skeleton
                                                variant="rectangular"
                                                sx={{marginLeft : 'auto', marginRight : 'auto'}}
                                                height={25}
                                                width={200}
                                            />
                                        )
                                    }
                                </Box>

                                <Box sx={{fontWeight : '700', justifyContent : 'center'}}>
                                    {orderDate}
                                </Box>
                            </Grid>

                            <Grid
                                xs={12}
                                sx={{
                                    ...receiptStyles.section,
                                    justifyContent : 'center',
                                    '& img'        : {
                                        height : {xs : '75px', sm : '100px'}
                                    }
                                }}
                            >
                                <img src={images.brandSpinner} alt="Brand Spinner"/>
                            </Grid>

                            <Grid
                                xs={12}
                                flexDirection={'column'}
                                sx={{
                                    ...receiptStyles.section
                                }}
                                className={'topLine'}
                            >
                                <Box className="smallHead left">Order Details</Box>
                                {order
                                    ? (
                                        <DrawBasketForReceiptScreen
                                            orderItems={order?.basket?.items || []}
                                            hidePrices={false}
                                            sxProps={{
                                                rowGap             : '10px',
                                                '& .productExtras' : {
                                                    fontSize : 'small'
                                                }
                                            }}
                                        />
                                    )
                                    : (
                                        <Grid container width={{xs : '100%', sm : 500}} sx={{marginLeft : 'auto', marginRight : 'auto'}}>
                                            <Grid flex={1}><Skeleton variant="rectangular" height={50} width={50}/></Grid>
                                            <Grid flex={5}><Skeleton variant="rectangular" height={50} width={200}/></Grid>
                                            <Grid flex={2}><Skeleton variant="rectangular" height={50} width={75}/></Grid>
                                        </Grid>
                                    )
                                }
                            </Grid>

                            <Grid xs={12} sx={{...receiptStyles.section}} className={'topLine'}>
                                <Box display="flex" flex={1} className="smallHead left" flexDirection={'column'}>Payment
                                    <Grid container className="cardDetails">
                                        <Grid flex={1}>
                                            {order
                                                ? (<img src={getCardImage(order?.payment?.cardType || '')} alt={''}/>)
                                                : (<Skeleton variant="rectangular" height={25} width={75}/>)
                                            }
                                        </Grid>

                                        <Grid flex={3}>
                                            **** ****
                                            {
                                                order?.payment?.cardNumber || <Skeleton variant="rectangular" height={25} width={60}/>
                                            }
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box display="flex" flex={1} className="smallHead left" flexDirection={'column'}>
                                    <Box className={'capitalize'}>
                                        {order
                                            ? `${getOrderType(order.basket?.type)}`
                                            : (<Skeleton variant="rectangular" height={25} width={200}/>)
                                        }
                                    </Box>

                                    <Grid container className="addressDetails" flexDirection={'column'}>
                                        <Grid flex={1} sx={{color : `#00000065`}}>Address</Grid>
                                        {order
                                            ? (/^delivery$/i.test(order?.basket?.type || ''))
                                                ? (<DrawAddressBlock addressLines={getAddressLines(order?.customer?.address?.addressComponents)}/>)
                                                : (
                                                    <DrawAddressBlock
                                                        addressLines={[
                                                            _.get(order, 'store.storeName', ''),
                                                            ...getAddressLines(order?.store?.address?.addressComponents)
                                                        ]}
                                                    />
                                                )
                                            : (<Skeleton variant="rectangular" height={75} width={200}/>)
                                        }
                                    </Grid>
                                </Box>
                            </Grid>

                            <Grid xs={12} sx={{...receiptStyles.section}} className={'topLine'}>
                                <Box display="flex" flex={1} className="smallHead left" flexDirection={'column'}>Order Summary
                                    <Grid container className="summaryDetails" flexDirection={'column'} rowGap={'4px'}>
                                        <Grid container flexDirection={'row'} height={'25px'} sx={{color : '#00000060'}}>
                                            <Grid flex={3}>Subtotal</Grid>
                                            <Grid flex={2} justifyContent={'flex-end'}>
                                                {order?.basket?.total
                                                    ? `${getSubTotalAsCurrency(order.basket.total, 1)}`
                                                    : (<Skeleton variant="rectangular" height={25} width={60}/>)
                                                }
                                            </Grid>
                                        </Grid>

                                        {/^delivery$/i.test(order?.basket?.type || '') && (
                                            <Grid container flexDirection={'row'} height={'25px'} sx={{color : '#00000060'}}>
                                                <Grid flex={3}>Delivery Fee</Grid>
                                                <Grid flex={2} justifyContent={'flex-end'}>
                                                    {order
                                                        ? `${_.get(order, 'deliveryFee', '')}`
                                                        : (<Skeleton variant="rectangular" height={25} width={60}/>)
                                                    }
                                                </Grid>
                                            </Grid>
                                        )}

                                        {Boolean(order?.basket?.discount) && (
                                            <Grid container flexDirection={'row'} height={'25px'} sx={{color : '#6ABEA0'}}>
                                                <Grid flex={3}>Promo Discount</Grid>
                                                <Grid flex={2} justifyContent={'flex-end'}>
                                                    {order?.basket.discount
                                                        ? `${getSubTotalAsCurrency(order?.basket?.discount, 1)}`
                                                        : (<Skeleton variant="rectangular" height={25} width={60}/>)
                                                    }
                                                </Grid>
                                            </Grid>
                                        )}

                                        <Grid container flexDirection={'row'} height={'50px'} className={'totalSection topDotted'}>
                                            <Grid flex={3}>Total</Grid>
                                            <Grid flex={2} justifyContent={'flex-end'}>
                                                {(order && total)
                                                    ? `${getSubTotalAsCurrency(total, 1)}`
                                                    : (<Skeleton variant="rectangular" height={25} width={60}/>)
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>

                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid xs={12} flex={1} mb={4} sx={{...receiptStyles.paperTear, backgroundImage : `url(${paperTearBottom})`}}>
                    {' '}
                </Grid>
            </Grid>
        </Page>
    );
}
