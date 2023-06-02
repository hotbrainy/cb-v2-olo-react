import _                                     from 'lodash';
import React                                 from 'react';
import {useEffect}                           from 'react';
import {useState}                            from 'react';
import {useSelector}                         from 'react-redux';
import moment                                from 'moment';
import {Moment}                              from 'moment';
import {Box}                                 from '@mui/material';
import {Button}                              from '@mui/material';
import {useMediaQuery}                       from '@mui/material';
import Page                                  from 'src/components/page';
import useConfig                             from 'src/components/useConfig';
import {useAppDispatch}                      from 'src/store';
import Grid                                  from '@mui/material/Unstable_Grid2';
import {effects}                             from 'src/shared/styles';
import {fonts}                               from 'src/shared/styles';
import {formStyles}                          from 'src/shared/styles';
import paletteColors                         from 'src/theme/paletteColors';
import {PaymentCollector}                    from './components/payment-parts';
import ModalDialog                           from 'src/components/display/modal-dialog/modal-dialog';
import googleIcon                            from 'src/assets/images/Icons/googleIcon.png';
import appleIcon                             from 'src/assets/images/Icons/appleIcon.png';
import {checkoutStyles}                      from './localStyles';
import {ICardData}                           from './components/card-parts';
import {PaymentDivider}                      from './components/payment-parts';
import {PointsBalanceTool}                   from './components/payment-parts';
import {TagCard}                             from './components/payment-parts';
import {TotalBlock}                          from './components/payment-parts';
import {apiGetPaymentGatewayTokenizeCardUrl} from '../../store/payment-gateway';
import {addBagItem}                          from 'src/store/basket';
import {removeBagItem}                       from 'src/store/basket';
import {getTotalPriceOfOrder}                from 'src/store/basket';
import {orderTypeToMenuType}                 from 'src/store/basket';
import {IBagItem}                            from 'src/store/basket';
import {apiSubmitOrder}                      from '../../store/orders';
import {DrawBasketForPaymentScreen}          from './components/basket/basket-parts';
import {setStorePickerOpen}                  from 'src/store/app';
import theme                                 from 'src/theme';
import {jumpTo}                              from '../content/drawSection';
import {DrawCheckoutFlowHeaderRow}           from './components/header-row/checkout-flow-header';
import LoadingSpinner                        from 'src/components/spinners/loading/loading';
import {apiGetProductForPluCoupon}           from '../../store/coupons';
import {apiSearchCoupons}                    from '../../store/coupons';
import {clearCurrentCoupon}                  from '../../store/coupons';
import PromotionTag                          from './components/payment-parts/promotion-tag';

function addSubItems(subItems?: IBagItem[] | null): IOrderBasketItem[] {
    return (subItems || [])
        .filter((customiser) => !_.isEmpty(customiser?.plu))
        .map((customiser) => ({
            id          : customiser.plu,
            referenceId : customiser.plu,
            name        : customiser.name || '',
            imageUri    : customiser.image || undefined,
            price       : customiser.price || 0,
            total       : (customiser.quantity || 0) * (customiser.price || 0),
            quantity    : customiser.quantity || 0,
            tax         : 0, // TODO: calculate this ???
            subItems    : [] // TODO: review this... addSubItems(customiser.subItems) ???
        } as IOrderBasketItem))
        ;
}

export function getOrderItemsFromBagItems(bagItems: IBagItem[]) {
    return (bagItems || [])
        .filter((bagItem) => !_.isEmpty(bagItem?.plu))
        .map((bagItem: IBagItem): IOrderBasketItem => ({
            id          : bagItem.plu!,
            referenceId : bagItem.plu!,
            name        : bagItem.name || '',
            imageUri    : bagItem.image || undefined,
            price       : bagItem.price || 0,
            total       : (bagItem.quantity || 0) * (bagItem.price || 0),
            quantity    : bagItem.quantity || 0,
            tax         : 0, // TODO: calculate this ???
            subItems    : addSubItems(bagItem.subItems)
        }))
        ;
}

export default function PaymentPage(): React.ReactElement {
    const config    = useConfig();
    const dispatch  = useAppDispatch();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    // Redux states
    const basketState         = useSelector((state: any) => state.basket);
    const customerState       = useSelector((state: any) => state.customer);
    const ordersState         = useSelector((state: any) => state.orders);
    const paymentGatewayState = useSelector((state: any) => state.paymentGateway);
    const storesState         = useSelector((state: any) => state.stores);

    const {currentStore} = storesState;

    const [deliveryAddress1, deliveryAddress2] = (customerState.currentAddress?.attributes?.address || ',').split(',');

    const [currentPaymentMethod, setCurrentPaymentMethod] = React.useState<any | null>(null);


    const localStyles = {
        root             : {
            ...checkoutStyles,
            ...formStyles.formBuilder,
            lineHeight          : '16px',
            fontSize            : '14px',
            '& .padBottom'      : {
                paddingBottom : '8px'
            },
            '& .portuguese'     : {
                ...fonts.portuguesa
            },
            '& .matter'         : {
                ...fonts.matter
            },
            '& .heading'        : {
                fontWeight : '700',
                fontSize   : '14px',
                width      : '100%'
            },
            '& .MuiSwitch-root' : {
                '& .Mui-checked' : {
                    '& .MuiSwitch-thumb' : {
                        color      : paletteColors.oportoOrange,
                        '& :hover' : {
                            backgroundColor : 'transparent'
                        }
                    },
                    '& .MuiSwitch-track' : {backgroundColor : paletteColors.oportoOrange}
                },
                '& :hover'       : {
                    backgroundColor : 'transparent'
                }
            }
        },
        form             : {
            ...checkoutStyles.form
        },
        appleDialogBack  : {
            backgroundColor : paletteColors.oportoBlack,
            width           : '100%',
            height          : '220px',
            borderRadius    : '12px',
            alignItems      : 'center',
            display         : 'flex',
            justifyContent  : 'center'
        },
        googleDialogBack : {
            backgroundColor : paletteColors.lightGrey,
            width           : '100%',
            height          : '220px',
            borderRadius    : '12px',
            alignItems      : 'center',
            display         : 'flex',
            justifyContent  : 'center'
        }
    };

    //*** region: Member data
    const currentCustomer = customerState.currentCustomer;

    const cardStack: ICardData[] = [
        // {
        //     cardNumber     : '1112',
        //     cardExpiry     : '04/2023',
        //     cardHolderName : 'Mr Pete Sherman',
        //     cardIcon       : masterCardIcon,
        //     cardType       : 'MasterCard',
        //     isDefault      : true
        // },
        // {
        //     cardNumber     : '6243',
        //     cardExpiry     : '04/2023',
        //     cardHolderName : 'Mr Pete Sherman',
        //     cardIcon       : visaCardIcon,
        //     cardType       : 'VISA',
        //     isDefault      : false
        // }
    ];
    //*** endregion: Member data

    /**
     * Called from the Card Collect Component if "valid" data entered
     * @param paymentData
     */
    const updatePaymentMethod = (paymentData: any) => {
        console.log('payment: ', paymentData);
        setCurrentPaymentMethod(paymentData.tokenizedCard);
    };

    const [modalOpen, setModalOpen]       = useState(false);
    const [modalTitle, setModalTitle]     = useState('Third Party Payment');
    const [modalContent, setModalContent] = useState<any>('');

    const triggerApplePay  = () => {
        setModalTitle('Apple Pay Trigger');
        setModalContent(
            <Box sx={localStyles.appleDialogBack}>
                <img src={appleIcon} alt={''}/>
            </Box>
        );
        setModalOpen(true);
    };
    const triggerGooglePay = () => {
        setModalTitle('Google Pay Trigger');
        setModalContent(
            <Box sx={localStyles.googleDialogBack}>
                <img src={googleIcon} alt={''}/>
            </Box>
        );
        setModalOpen(true);
    };

    // const defaultPickupTime         = dateAdd(new Date(), 'minute', 30);
    const [orderType, setOrderType] = useState<OrderType>(basketState.orderType!);

    const [channelLinkId, setChannelLinkId] = useState<string>(basketState.channelLinkId!);

    const [memberType, setMemberType] = useState('GUEST');

    // function changeMemberType(event: React.ChangeEvent<HTMLInputElement>): void {
    //     const newVal = event.target.checked ? 'MEMBER' : 'GUEST';
    //     setMemberType(newVal);
    // }


    const [orderSubtotal, setOrderSubtotal] = useState<number>(getTotalPriceOfOrder(basketState.bagItems));
    const [orderTotal, setOrderTotal]       = useState<number>(getTotalPriceOfOrder(basketState.bagItems));


    //*** region: coupons
    const couponsState = useSelector((state: any) => state.coupons);

    const [couponCode, setCouponCode]         = useState<string | null>(null);
    const [couponPlu, setCouponPlu]           = useState<string | null>(null);
    const [couponValid, setCouponValid]       = useState<boolean | null>(null);
    // const [couponData, setCouponData]         = useState<any | null>(null);
    const [discountAmount, setDiscountAmount] = useState<number>(0);
    const [errorMsg, setErrorMsg]             = useState<string | null>(null);


    useEffect(() => {
        const currentCoupon = couponsState.currentCoupon;
        if (couponsState.loading || (currentCoupon === null)) {
            return;
        }

        // Reset the coupon
        setCouponCode(null);
        setCouponPlu(null);

        let isValidCoupon = !_.isEmpty(currentCoupon) && (orderSubtotal >= currentCoupon.minSpend);

        if (isValidCoupon) {
            // Amount discount coupon
            if (/^dollar$/i.test(currentCoupon.discountType || '')) {
                // Ensure subtotal is never < 0
                const sanitizedDiscountAmount = Math.min(orderSubtotal, currentCoupon.amount);

                // setCouponData(currentCoupon);
                setCouponValid(true);
                setDiscountAmount(sanitizedDiscountAmount);
                setOrderTotal(orderSubtotal - sanitizedDiscountAmount);
                return;
            }

            // Percentage discount coupon
            if (/^percent$/i.test(currentCoupon.discountType || '')) {
                // Ensure subtotal is never < 0
                const sanitizedDiscountAmount = Math.min(orderSubtotal, orderSubtotal * (currentCoupon.amount / 100));

                // setCouponData(currentCoupon);
                setCouponValid(true);
                setDiscountAmount(sanitizedDiscountAmount);
                setOrderTotal(orderSubtotal - sanitizedDiscountAmount);
                return;
            }

            // Product PLU coupon
            if (currentCoupon.product?.plu) {
                // TODO: review this... simply checking for zero price is probably insufficient
                // Check if the coupon is already applied
                const ii = (basketState.bagItems || []).findIndex((p: IBagItem) => (p.price === 0));
                if (ii >= 0) {
                    return;
                }

                setCouponPlu(currentCoupon.product?.plu);
                return;
            }

            // isValidCoupon = false;
        }

        // setCouponData(null);
        setCouponValid(false);
    }, [couponsState, orderSubtotal, orderTotal, couponCode]);


    useEffect(() => {
        const storeId = storesState.currentStore?.id;
        if (_.isEmpty(storeId) || _.isEmpty(couponPlu)) {
            return;
        }

        const pluCouponProduct = couponsState.pluCouponProduct;
        if (_.isEmpty(pluCouponProduct)) {
            if ((pluCouponProduct === null) && !couponsState.loading) {
                if (couponsState.error) {
                    setErrorMsg(couponsState.error || 'An error occurred');
                    return;
                }

                const menuType = orderTypeToMenuType(basketState.orderType);
                dispatch(apiGetProductForPluCoupon({config, storeId, menuType, plu : couponPlu!}));
            }

            return;
        }

        // setCouponData(couponsState.currentCoupon);
        setCouponValid(true);

        // Add product to basket
        const bagItem: IBagItem = {
            ...couponsState.pluCouponProduct,
            // categoryName : null,
            name        : couponsState.currentCoupon?.title || couponsState.pluCouponProduct?.name,
            productName : couponsState.pluCouponProduct?.name,
            price       : 0,
            quantity    : 1,
            min         : 1,
            max         : 1,
            subItems    : []
        };
        dispatch(addBagItem(bagItem));
    }, [couponsState, couponPlu]);

    // Samples: 5DOLLAR, 10PERCENT, FREETEMPTA, FREECHIPS
    function getCouponCodeFromUser(input: string) {
        const couponCode = (input || '').trim().toUpperCase();
        setCouponCode(couponCode || null);
        setCouponPlu(null);

        if (_.isEmpty(couponCode)) {
            // TODO: review this... simply checking for zero price is probably insufficient
            // Remove any PLU Promo
            const ii = (basketState.bagItems || []).findIndex((p: IBagItem) => (p.price === 0));
            if (ii >= 0) {
                dispatch(removeBagItem(ii));
            }

            dispatch(clearCurrentCoupon(null));
            setDiscountAmount(0);
            setOrderTotal(orderSubtotal);
            setCouponValid(null);
            return;
        }

        dispatch(apiSearchCoupons({config, couponCode}));
    }

    //*** endregion: coupons

    //*** region: Changers
    function changeCustomerDetails() {
        jumpTo('/dispatch');
    }

    function changeDeliveryDetails() {
        console.log('Change delivery address clicked');
    }

    function changeDeliveryInstruction() {
        console.log('Change delivery instructions clicked');
    }

    function changeDeliveryTime() {
        console.log('Change delivery time clicked');
    }

    function changePickupFrom() {
        console.log('Change Pickup From clicked');
        if (isDesktop) {
            // Open the Modal
            dispatch(setStorePickerOpen(true));
            return;
        }

        jumpTo('/locations');
    }

    function changePickupTime() {
        console.log('Change Pickup Time clicked');
    }

    //*** endregion: changers


    function setPointsAgainstOrder(val: number) {
        console.log('Use this many points: ', val);
    }

    const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
    const [valid, setValid]                         = useState(false);

    useEffect(() => {
        // TODO: validate more in here if you want
        if (!_.isEmpty(currentPaymentMethod)) {
            setValid(true);
        }
    }, [currentPaymentMethod]);

    function submitOrder() {
        if (isSubmittingOrder || _.isEmpty(currentPaymentMethod)) {
            return;
        }

        setIsSubmittingOrder(true);

        //*** region: order notes
        let scheduledTime: Moment | null = null;
        let instructions                 = '';
        if (/^catering$/i.test(orderType || '')) {
            // TODO: determine catering pickup time
            // TODO: factor in known holiday dates
            // TODO: apply other catering business rules
            scheduledTime = moment().add(48, 'hours');
        }
        else if (/^collection$/i.test(orderType || '')) {
            scheduledTime = moment().add(10, 'minutes');
            instructions  = [
                // TODO: need to grab the prep-time from a config setting (deliverect store info or aws parameter store value ???)
                scheduledTime.format('DD/MM/YYYY HH:mm A'),    // Pickup time
                (currentCustomer?.firstName || '').trim(),    // Customer first name
                (currentCustomer?.lastName || '').trim(),     // Customer last name
                (instructions || '').trim()                           // Additional instructions
            ].filter(p => !_.isEmpty(p)).join(' ');
        }
        else if (/^delivery$/i.test(orderType || '')) {
            // TODO: estimated delivery time
        }
        //*** endregion: order notes

        // Build a new order to be submitted
        const order: IOrder = {
            // TODO: ##################
            // TODO: implement this ???
            // TODO: ##################
            clientType    : 'WEB',
            clientVersion : 'V.0.0.0.0',
            // TODO: ##################

            basket : {
                type                  : orderType.toUpperCase(),
                discount              : discountAmount, // pass as a +ve value... the backend api service will handle the rest
                tax                   : 0, // TODO: implement this ???
                total                 : orderTotal,
                asap                  : !/^catering$/i.test(orderType || '') /*&& !isScheduled*/,     // TODO: implement this ???
                // TODO: #####################################################
                // TODO: review this... (should really be handled server-side)
                // TODO: #####################################################
                placementDateTime     : moment.utc().toISOString(),
                pickupDateTime        : scheduledTime?.toISOString() || undefined,
                pickupDateTimeOffset  : scheduledTime?.format('Z').replace(':', '') || undefined,
                dropOffDateTime       : scheduledTime?.toISOString() || undefined,
                // dropOffDateTimeOffset : moment().format('Z').replace(':', ''),
                dropOffDateTimeOffset : scheduledTime?.format('Z').replace(':', '') || undefined,
                // TODO: #####################################################
                notes                 : instructions,
                items                 : getOrderItemsFromBagItems(basketState.bagItems)
            },

            store : {
                id      : _.get(currentStore, 'id', null),
                abn     : _.get(currentStore, 'abn', ''),
                address : {
                    address           : _.get(currentStore, 'storeAddress.address', null),
                    addressComponents : _.get(currentStore, 'storeAddress.addressComponents', null)
                }
            },

            payment : {
                total    : orderTotal,
                dateTime : moment.utc().toISOString(), // TODO: review this... DateTime/UTC/Format ???
                payments : [
                    {
                        type           : 'CREDIT_CARD_TOKEN',
                        amount         : orderTotal,
                        capture        : false,
                        paymentDetails : {
                            // cardTokenId : currentPaymentMethod.id, // TODO: review this... needs preauth=true to generate an id ???
                            cardTokenId : currentPaymentMethod.token,
                            cardToken   : currentPaymentMethod.token
                        }
                    }
                ]
            },

            customer : {
                firstName : currentCustomer?.firstName || '',
                lastName  : currentCustomer?.lastName || '',
                email     : currentCustomer?.email || '',
                phone     : currentCustomer?.phone || '',
                address   : (!/^delivery$/i.test(orderType || '') || _.isEmpty(customerState.currentAddress)) ? undefined : {
                    address           : _.get(customerState.currentAddress, 'attributes.address', null),
                    addressComponents : _.get(customerState.currentAddress, 'attributes.addressComponents', null)
                }
                // loyalty   : null  // TODO: populate when loyalty member
            },

            delivery : !/^delivery$/i.test(orderType || '') ? undefined : {
                vendor : 'DOORDASH'
            },

            channelLinkId
        };

        dispatch(apiSubmitOrder({config, order}));
    }


    //*** region: Card Tokenization
    useEffect(() => {
        if (_.isEmpty(currentStore?.id)) {
            return;
        }

        if (_.isEmpty(paymentGatewayState.tokenizeCardUrl)) {
            if ((paymentGatewayState.tokenizeCardUrl === null) && !paymentGatewayState.loading) {
                if (paymentGatewayState.error) {
                    setErrorMsg(paymentGatewayState.error || 'An error occurred');
                    return;
                }

                dispatch(apiGetPaymentGatewayTokenizeCardUrl({config, storeId : currentStore.id}));
            }

            return;
        }
    }, [config, currentStore, paymentGatewayState]);
    //*** endregion: Card Tokenization


    //*** region: Order Submitted successfully
    useEffect(() => {
        const orderId = ordersState.orderId;
        if (_.isEmpty(orderId)) {
            return;
        }

        setIsSubmittingOrder(false);

        if (/^delivery$/i.test(orderType || '')) {
            jumpTo(`/delivery/${orderId}`);
        }
        else if (/^collection$/i.test(orderType || '')) {
            jumpTo(`/pickup/${orderId}`);
        }
        else {
            jumpTo(`/status/${orderId}`);
        }
    }, [ordersState, orderType]);
    //*** endregion: Order Submitted successfully


    return (
        <Page>
            <Grid container width={'100%'} display="flex" justifyContent={'center'}>
                <Grid
                    xs={12}
                    className={'theme'}
                    width={'100%'}
                    marginTop={'4px'}
                >
                    <DrawCheckoutFlowHeaderRow/>
                </Grid>
                <Grid
                    className={'theme'}
                    width={'100%'}
                    height="100%"
                    alignSelf={'start'}
                    display="flex"
                    flexDirection={{xs : 'column', sm : 'row'}}
                    p={2}
                >
                    <Grid xs={12} sm={6} flex={1} width="100% !important" marginRight={{xs : 0, sm : '12px'}}>
                        <PaymentCollector
                            memberType={memberType}
                            cardStack={cardStack}
                            onChange={updatePaymentMethod}
                            fireApplePay={triggerApplePay}
                            fireGooglePay={triggerGooglePay}
                            placeholders={{cardExpiry : 'Expiry Date (MM/YY)'}}
                        />
                    </Grid>

                    <Grid
                        xs={12}
                        sm={6}
                        flex={1}
                        marginLeft={{xs : 0, sm : '12px'}}
                        sx={{...localStyles.form, display : 'flex', flexDirection : 'column'}}
                    >
                        <Grid width={'100%'} px={1} pt={4} pb={4} flexDirection="column" display="flex">
                            <Grid xs={12} sx={{textAlign : 'center'}} pb={'24px'} className="heading">
                                {`Order Confirmation`}
                            </Grid>

                            {/^delivery$/i.test(orderType || '') ? (
                                <Grid container width={'100%'}>
                                    <Grid xs={12} width="100%" sx={{textAlign : 'center'}} className="heading">
                                        <TagCard
                                            title={'Name'}
                                            line1={`${currentCustomer?.firstName || ''} ${currentCustomer?.lastName || ''}`.trim() || 'Guest'}
                                            line2={currentCustomer?.email || ''}
                                            line3={currentCustomer?.phone || ''}
                                            onChangeClick={changeCustomerDetails}
                                        />
                                    </Grid>

                                    <Grid xs={12} sx={{textAlign : 'center'}} className="heading">
                                        <TagCard
                                            title={'Deliver To'}
                                            line1={deliveryAddress1}
                                            line2={deliveryAddress2}
                                            line3={''}
                                            onChangeClick={changeDeliveryDetails}
                                        />
                                    </Grid>

                                    <Grid xs={12} sx={{textAlign : 'center'}} className="heading">
                                        <TagCard
                                            title={'Delivery Instructions'}
                                            line1={'Leave at Door'}
                                            line2={'No additional Instructions given'}
                                            line3={''}
                                            onChangeClick={changeDeliveryInstruction}
                                        />
                                    </Grid>

                                    <Grid xs={12} sx={{textAlign : 'center'}} className="heading">
                                        <TagCard
                                            title={'Delivery Time'}
                                            line1={'Monday 1 August, Standard - 20 to 30 min'}
                                            line2={''}
                                            line3={''}
                                            onChangeClick={changeDeliveryTime}
                                        />
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid container width={'100%'}>
                                    <Grid xs={12} sx={{textAlign : 'center'}} pb={'24px'} width={'100%'} className="heading">
                                        <TagCard
                                            title={'Name'}
                                            line1={`${currentCustomer?.firstName || ''} ${currentCustomer?.lastName || ''}`.trim() || 'Guest'}
                                            line2={currentCustomer?.email || ''}
                                            line3={currentCustomer?.phone || ''}
                                            onChangeClick={changeCustomerDetails}
                                        />
                                    </Grid>

                                    <Grid xs={12} sx={{textAlign : 'center'}} className="heading">
                                        <TagCard
                                            title={'Pickup From'}
                                            line1={_.get(currentStore, 'storeName', '')}
                                            line2={_.get(currentStore, 'storeAddress.addressComponents.streetName.value', '').trim()}
                                            line3={
                                                [
                                                    _.get(currentStore, 'storeAddress.addressComponents.suburb.value', '').trim(),
                                                    _.get(currentStore, 'storeAddress.addressComponents.state.value', '').trim(),
                                                    _.get(currentStore, 'storeAddress.addressComponents.postcode.value', '').trim()
                                                ].join(' ').trim()
                                            }
                                            onChangeClick={changePickupFrom}
                                        />
                                    </Grid>

                                    {/^catering$/i.test(orderType || '') && (
                                        <Grid xs={12} sx={{textAlign : 'center'}} className="heading">
                                            <TagCard
                                                title={'Pickup Time'}
                                                line1={'Monday 1 August, 12:45 PM'}
                                                line2={''}
                                                line3={''}
                                                onChangeClick={changePickupTime}
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                            )}
                            {(memberType === 'MEMBER') && (
                                <Grid container width="100%">
                                    <PaymentDivider marginTop={'48px'} marginBottom={'48px'}/>

                                    <Grid xs={12} sx={{textAlign : 'center'}} mb={'24px'} className="heading">
                                        Save on your order?
                                    </Grid>

                                    <Grid
                                        xs={12}
                                        mb={'24px'}
                                        sx={{...fonts.matter, fontSize : '16px', textAlign : 'center'}}
                                        className="justifyGridLeft"
                                    >
                                        {`Use your Flame Rewards dollars balance to save on your order.`}
                                    </Grid>

                                    <Grid
                                        xs={12}
                                        sx={{...fonts.matter, fontSize : '16px', textAlign : 'center'}}
                                        className="justifyGridLeft"
                                    >
                                        <PointsBalanceTool
                                            // TODO: get this number from loyalty
                                            available={14}
                                            onChange={setPointsAgainstOrder}
                                        />
                                    </Grid>
                                </Grid>
                            )}

                            <PaymentDivider marginTop={'48px'} marginBottom={'48px'}/>

                            <Grid
                                xs={12}
                                width="100%"
                                sx={{textAlign : 'center'}}
                                padding={'0 !important'}
                            >
                                <DrawBasketForPaymentScreen bagItems={basketState.bagItems || []}/>
                            </Grid>

                            <PaymentDivider marginTop={'48px'} marginBottom={'48px'}/>
                            <Grid
                                xs={12}
                                sx={{textAlign : 'center'}}
                                width="100%"
                                paddingTop={{xs : '0 !important', sm : '24px !important'}}
                                className="heading"
                            >
                                <PromotionTag
                                    disabled={couponsState.loading}
                                    busy={couponsState.loading}
                                    text={'Add Promotion'}
                                    onCheckClicked={getCouponCodeFromUser}
                                    sxProps={{width : '100%', padding : '0'}}
                                    textProps={{paddingTop : '8px !important'}}
                                    currentCoupon={couponsState.currentCoupon}
                                    couponValid={couponValid}
                                />
                            </Grid>

                            <Grid
                                xs={12}
                                width="100%"
                                sx={{textAlign : 'center'}}
                                paddingTop={'24px !important'}
                                className="heading"
                            >
                                <TotalBlock
                                    subtotal={orderSubtotal}
                                    discount={discountAmount}
                                    pickup={0}
                                />
                            </Grid>

                            {isSubmittingOrder && (
                                <Grid xs={12} flex={1}>
                                    <LoadingSpinner noMargin={true} text="Processing..."/>
                                </Grid>
                            )}

                            <Grid
                                xs={12}
                                width="100%"
                                sx={{textAlign : 'center'}}
                                paddingTop={'24px !important'}
                                className="heading"
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        width : '100% !important',
                                        ...effects.buttonShadow,
                                        lineHeight : '14px'
                                    }}
                                    disabled={isSubmittingOrder || !valid}
                                    onClick={submitOrder}
                                >
                                    {`PAY NOW`}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <ModalDialog
                isOpen={modalOpen}
                title={modalTitle}
                content={modalContent}
                onClose={() => setModalOpen(false)}
            />
        </Page>
    );
}
