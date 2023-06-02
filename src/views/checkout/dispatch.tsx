import _                           from 'lodash';
import React                       from 'react';
import {useEffect}                 from 'react';
import {useState}                  from 'react';
import {useSelector}               from 'react-redux';
import Grid                        from '@mui/material/Unstable_Grid2';
import {Button}                    from '@mui/material';
import {useMediaQuery}             from '@mui/material';
import Page                        from '../../components/page';
import {useAppDispatch}            from '../../store';
import {setCurrentCustomer}        from '../../store/customer';
import {ContactCollector}          from './components/contact-collector';
import {IContactData}              from './components/contact-collector';
import {DrawPickupInformation}     from './components/pickup-information';
import {IPickupData}               from './components/pickup-information';
import {dateAdd}                   from '../../utils/utils';
import {effects}                   from '../../shared/styles';
import {apiFetchPricingTierData}   from '../../store/marketing';
import {apiMarketingSubscribe}     from '../../store/marketing';
import {IPricingTier}              from '../../store/marketing';
import useConfig                   from '../../components/useConfig';
import {getDistance}               from '../locations';
import {IPoint}                    from '../locations';
import theme                       from 'src/theme';
import {setStorePickerOpen}        from 'src/store/app';
import {jumpTo}                    from '../content/drawSection';
import {DrawCheckoutFlowHeaderRow} from './components/header-row/checkout-flow-header';

export default function DispatchPage(): React.ReactElement {
    // const theme    = useTheme();
    const config    = useConfig();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    const dispatch = useAppDispatch();

    // Redux states
    const basketState       = useSelector((state: any) => state.basket);
    const customerState     = useSelector((state: any) => state.customer);
    const {currentStore}    = useSelector((state: any) => state.stores);
    const {currentCustomer} = useSelector((state: any) => state.customer);

    const [canContinue, setCanContinue] = useState<boolean>(false);

    const [orderType, setOrderType] = useState<OrderType>(basketState.orderType!);

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    /*** region: Customer location */
    const [userLocation, setUserLocation] = useState<IPoint | null>(null);

    useEffect(() => {
        if (/^delivery$/i.test(orderType || '')) {
            const customerAddress = _.get(customerState, 'currentAddress.attributes', null);
            const lat             = _.get(customerAddress, 'addressComponents.latitude.value', null);
            const lng             = _.get(customerAddress, 'addressComponents.longitude.value', null);

            setUserLocation((lat && lng) ? {lat, lng} : null);
            return;
        }

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coords = position?.coords;
                if (coords?.latitude && coords?.longitude) {
                    setUserLocation({
                        lat : coords.latitude,
                        lng : coords.longitude
                    });
                }
            });
        }
    }, [orderType, customerState]);
    /*** endregion: Customer location */


    /*** region: fetch pricing tier csv data */
    const marketingState    = useSelector((state: any) => state.marketing);
    const {pricingTierData} = marketingState;

    useEffect(() => {
        if (_.isEmpty(pricingTierData)) {
            if ((pricingTierData === null) && !marketingState.loading) {
                if (marketingState.error) {
                    setErrorMsg(marketingState.error || 'An error occurred');
                    return;
                }

                dispatch(apiFetchPricingTierData({config}));
            }

            return;
        }
    }, [config, marketingState]);


    /*** region: contact data */
    const [contactData, setContactData] = useState<IContactData | null>(currentCustomer);

    function isValidContact(contactData?: IContactData | null): boolean {
        // TODO: factor in delivery address for delivery orders

        // Has valid contact info
        return Boolean((contactData?.firstName || '').trim()
            && (contactData?.lastName || '').trim()
            && (contactData?.email || '').trim()
            && (contactData?.phone || '').trim()
        );
    }

    function updateContact(contactData?: IContactData | null): void {
        console.log('contact: ', contactData);

        const isContactUpdated = (currentCustomer?.firstName !== contactData?.firstName)
            || (currentCustomer?.lastName !== contactData?.lastName)
            || (currentCustomer?.email !== contactData?.email)
            || (currentCustomer?.phone !== contactData?.phone)
            || (currentCustomer?.signUpForRewards !== contactData?.signUpForRewards)
        ;

        if (isContactUpdated) {
            // TODO: factor in delivery address
            const isContactEmpty = _.isEmpty((contactData?.firstName || '').trim())
                && _.isEmpty((contactData?.lastName || '').trim())
                && _.isEmpty((contactData?.email || '').trim())
                && _.isEmpty((contactData?.phone || '').trim())
            ;

            dispatch(setCurrentCustomer(isContactEmpty ? null : {
                firstName        : contactData!.firstName,
                lastName         : contactData!.lastName,
                email            : contactData!.email,
                phone            : contactData!.phone,
                signUpForRewards : contactData!.signUpForRewards
                // --
                // loyalty   : ???,
                // address   : ??? // Only required for delivery orders
            }));
        }

        setContactData(contactData || null);
        setCanContinue(isValidContact(contactData));
    }

    /*** endregion: contact data */


    // const [pickupData, setPickupData] = useState<IPickupData>({collectTime : 'ASAP'});
    function updatePickup(pickupData?: IPickupData | null): void {
        console.log('updatePickup: ', pickupData);
    }

    function changeRestaurantButtonEvent(): void {
        if (isDesktop) {
            // Open the Modal
            dispatch(setStorePickerOpen(true));
            return;
        }

        // Navigate to the Locations Page
        jumpTo('/locations');
    }

    function restaurantInfoButtonEvent(): void {
        jumpTo(`/locations/${currentStore.id}`);
    }

    function subscribe(): void {
        if (!currentCustomer?.signUpForRewards) {
            return;
        }

        const storePostcode   = _.get(currentStore, 'storeAddress.addressComponents.postcode.value', '').trim();
        const pricingTierItem = _.isEmpty(storePostcode)
            ? null
            : (pricingTierData || []).find((p: IPricingTier) => p.postcode === storePostcode)
        ;

        if (_.isEmpty(pricingTierItem)) {
            // TODO: handle missing data ???
        }
        else {
            dispatch(apiMarketingSubscribe({
                config,
                params : {
                    name      : currentCustomer.firstName,
                    email     : currentCustomer.email,
                    priceTier : pricingTierItem.priceTier,
                    phone     : currentCustomer.phone
                }
            }));
        }
    }

    function showNextScreen(): void {
        subscribe();
        jumpTo('/payment');
    }


    // TODO: ########################################
    // TODO: move catering business rules to a config
    // TODO: apply the catering business rules
    // TODO: ########################################
    // const minCateringSpend      = 6000; // Customer must spend at least $60 (as cents) to place a catering order
    const minCateringPickupDays = 2;    // Catering orders must be placed at least 2 days in advance
    // const maxCateringPickupDays = 30;   // Catering orders must be placed less than 30 days in advance
    // TODO: ########################################

    const defaultPickupTime = /^catering$/i.test(orderType || '')
        ? dateAdd(new Date(), 'day', minCateringPickupDays)
        : dateAdd(new Date(), 'minute', 30)
    ;

    return (
        <Page>
            <Grid container height={'fit-content'} width={'100%'} display="flex" justifyContent={'center'}>
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
                    columnGap={{sm : '20px'}}
                    p={2}
                >
                    <Grid xs={12} sm={6} flex={1} width={'100% !important'}>
                        <ContactCollector
                            contactData={contactData}
                            linkToLogin={'/login'}
                            onChange={(value: any) => updateContact(value)}
                            sxProps={{'& .linkLine' : {fontWeight : '700'}}}
                        />
                    </Grid>

                    <Grid xs={12} sm={6} flex={1} width={'100% !important'} sx={{'& .MuiGrid2-root' : {padding : '6px'}}}>
                        <DrawPickupInformation
                            store={currentStore as IExtendedStore}
                            orderType={orderType}
                            collectTime={/^(?:collection|delivery)$/i.test(orderType || '') ? 'ASAP' : 'SCHEDULE'}
                            pickupTime={{
                                hour   : defaultPickupTime!.getHours(),
                                minute : defaultPickupTime!.getMinutes()
                            }}
                            sxProps={{padding : 0}}
                            onChange={(value: any) => updatePickup(value)}
                            distanceAway={getDistance(userLocation, {lat : currentStore?.lat, lng : currentStore?.lng})}
                            restaurantInfoButtonEvent={restaurantInfoButtonEvent}
                            changeRestaurantButtonEvent={changeRestaurantButtonEvent}
                        />

                        <Grid xs={12} width={'100%'} px={1} pt={4} pb={4}>
                            <Button
                                variant="contained"
                                sx={{paddingBottom : '10px', width : '100% !important', ...effects.buttonShadow}}
                                onClick={() => showNextScreen()}
                                disabled={!canContinue}
                            >
                                {`Continue`}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Page>
    );
}
