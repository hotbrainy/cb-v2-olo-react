import _                 from 'lodash';
import React             from 'react';
import Grid              from '@mui/material/Unstable_Grid2';
import {fonts}           from 'src/shared/styles';
import {icons}           from 'src/shared/styles';
import {images}          from 'src/shared/styles';
import {guid}            from 'src/utils/utils';
import paletteColors     from 'src/theme/paletteColors';
import {Box}             from '@mui/material';
import {Button}          from '@mui/material';
import {Hidden}          from '@mui/material';
import {IPoint}          from '..';
import {locationsStyles} from '../styles';
import {useNavigate}     from 'react-router-dom';
import {jumpTo}          from 'src/views/content/drawSection';

export function DrawOpeningHours(props: { store: IExtendedStore, miniWeekdays?: boolean }): React.ReactElement {
    const {store, miniWeekdays} = props;

    return (
        <Grid container width="100%" sx={{...fonts.matter}}>
            {_.times(7, (ii: number) => {
                const day           = (ii + 1) % 7;
                const dayOfWeek     = getDayOfWeek(day);
                const dayOfWeekText = miniWeekdays ? dayOfWeek.substring(0, 3) : dayOfWeek;

                const tradingHours          = getStoreTradingHours({store, day});
                const [openTime, closeTime] = tradingHours.split(' - ');

                return (
                    <Grid container width={'100%'} key={guid()}>
                        <Grid xs={3} sx={{fontWeight : 700}}>{dayOfWeekText}</Grid>
                        <Grid xs={4} justifyContent="end" textAlign={'end'}>{openTime}</Grid>
                        <Grid xs={1} justifyContent="center" textAlign={'center'}>-</Grid>
                        <Grid xs={4} justifyContent="start" textAlign={'start'}>{closeTime}</Grid>
                    </Grid>
                );
            })}
        </Grid>
    );
}

export function getDayOfWeek(day: number): string {
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekday[day];
}

export function getStoreIsOpen(store: IExtendedStore, time: Date): boolean {
    if (!store?.isEnabled) {
        return false;
    }

    // TODO: determine whether holidays need to be factored in ???

    // Extract all trading hours for a given weekday (there may be split shifts)
    const dayOfWeek           = getDayOfWeek(time.getDay());
    const weekDayTradingHours = (store?.tradingHours || []).filter(p => p.dayOfWeek === dayOfWeek);
    if (_.isEmpty(weekDayTradingHours)) {
        return false;
    }

    const timeMinutesSinceMidnight = (time.getHours() * 60) + time.getMinutes();

    for (const tradingHours of weekDayTradingHours) {
        const [openHH, openMM, openSS] = extractTradingHourShifts(tradingHours)[0].openTime.split(':');
        const openMinutesSinceMidnight = (Number(openHH || '0') * 60) + Number(openMM || '0');

        const [closeHH, closeMM, closeSS] = extractTradingHourShifts(tradingHours)[0].closeTime.split(':');
        const closeMinutesSinceMidnight   = (Number(closeHH || '0') * 60) + Number(closeMM || '0')
            // Check if the close hours have gone past midnight
            + (((closeHH < openHH) || ((closeHH === openHH) && (closeMM <= openMM))) ? (24 * 60) : 0)
        ;

        // Assume open 24 hours when close === open
        if ((timeMinutesSinceMidnight >= openMinutesSinceMidnight) && (timeMinutesSinceMidnight <= closeMinutesSinceMidnight)) {
            return true;
        }
    }

    return false;
}

/***
 *
 * @param {string} value - time formatted as HH:MM:SS
 * @returns {string}
 */
export function transformTime(value: string): string {
    const match = /^(\d?\d):(\d\d):(\d\d)$/i.exec(value || '');
    if ((match || []).length !== 4) {
        return '';
    }

    const HH   = Number(match![1]) % 13;
    const MM   = match![2];
    // const SS   = match![3];
    const AMPM = (Number(match![1]) < 12) ? 'am' : 'pm';

    return `${HH}:${MM}${AMPM}`;
}

function extractTradingHourShifts(timeSlots: any): any[] {
    return ('openTime' in timeSlots)
        ? [timeSlots]
        : ('hours' in timeSlots)
            ? timeSlots.hours
            : (timeSlots as any).collectionTimePeriods
        ;
}

export function getStoreTradingHours(props: { store: IExtendedStore, time?: Date, day?: number }): string {
    const weekday   = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = weekday[props.time?.getDay() || props.day || (new Date()).getDay()];

    const timeSlots = props.store?.tradingHours?.find(p => p.dayOfWeek === dayOfWeek);
    if (_.isEmpty(timeSlots)) {
        return '';
    }

    const shifts = extractTradingHourShifts(timeSlots);
    if (_.isEmpty(shifts)) {
        return '';
    }

    // TODO: review this... trading hours may contain several shifts on a single day of the week.
    // TODO: review this... how to handle 24 hour trading ???
    return [
        transformTime(shifts[0].openTime),
        transformTime(shifts[0].closeTime)
    ].join(' - ');
}


interface IAddressProps
{
    store: IExtendedStore;
    textAlign?: any; //Property.TextAlign;
}

export function DrawAddress(props: IAddressProps) {
    const {store} = props;
    const align   = props.textAlign || {xs : 'center', sm : 'start'};

    const addressComponents = store?.storeAddress?.addressComponents || null;

    const addressLine1 = (addressComponents?.streetName?.value || '').trim();
    const addressLine2 = [
        (addressComponents?.suburb?.value || '').trim(),
        (addressComponents?.state?.value || '').trim(),
        (addressComponents?.postcode?.value || '').trim()
    ].filter(p => p).join(', ');

    return addressComponents
        ? (<Grid container width="100%" display="flex" sx={{...fonts.matter, textAlign : align}}>
                <Grid xs={12} width="100%" justifyContent={align} sx={{overflow : 'hidden', whiteSpace : 'nowrap', textOverflow : 'ellipsis'}}>
                    {addressLine1}
                </Grid>

                <Grid xs={12} width="100%" justifyContent={align} sx={{overflow : 'hidden', whiteSpace : 'nowrap', textOverflow : 'ellipsis'}}>
                    {addressLine2}
                </Grid>
            </Grid>
        )
        : (<Box>Not found...</Box>)
        ;
}

function transformAmenities(amenities?: Amenities | null): Amenities {
    return Object.fromEntries(Object
        // Convert object to [key, value] array
        .entries(amenities || {})

        // Ensure the amenity name starts with 'have'
        .filter(([amenityName, isAvailable]: [string, boolean]) => /^have/i.test((amenityName || '').trim()))

        // Transform the result
        .map(([amenityName, isAvailable]: [string, boolean]) => [
            (amenityName || '').trim().replace(/^have/i, ''),
            isAvailable
        ])
    );
}


interface IFeaturesProps
{
    store: IExtendedStore;
    textSize?: { xs: string, sm: string };
    featureFlex?: number;
}

export function DrawFeatures(props: IFeaturesProps): React.ReactElement {
    const {store, textSize, featureFlex} = props;

    // TODO: review this... should populate from store data (not hard-coded)
    const pickupTypes: PickupTypes = {
        'Drive-thru'      : store.pickupTypes.driveThru || false,
        'Pickup Kerbside' : store.pickupTypes.kerbside || false,
        'Pickup In Store' : store.pickupTypes.instore || false
    };

    const features: PickupTypes | Amenities = {
        ...pickupTypes,
        ...transformAmenities(store.amenities)
    };

    const availableFeatureNames: string[] = Object.keys(features).filter((name) => features[name]);

    return (
        <Grid container width="100%" sx={{...fonts.matter}}>
            {availableFeatureNames.map((featureName: string, index: number) => (
                <DrawCheckedFeature
                    key={`feature-${index}`}
                    textSize={textSize}
                    featureFlex={featureFlex}
                    isAvailable={true}
                    featureName={featureName}
                    checkedElement={{
                        icon  : <icons.optionChecked/>,
                        color : paletteColors.green
                    }}
                    uncheckedElement={{
                        icon  : <icons.optionUnchecked/>,
                        color : `${paletteColors.black}60`
                    }}
                />
            ))}
        </Grid>
    );
}


interface ICheckedFeatureProps
{
    isAvailable: boolean;
    featureName: string;
    checkedElement: {
        icon: React.ReactElement;
        color: string;
    };
    uncheckedElement: {
        icon: React.ReactElement;
        color: string;
    };
    textSize?: { xs: string, sm: string };
    featureFlex?: number;
}

export function DrawCheckedFeature(props: ICheckedFeatureProps): React.ReactElement {
    const {isAvailable, featureName, checkedElement, uncheckedElement} = props;

    const styles = {
        container : {
            display    : 'flex',
            alignItems : 'center'
        },
        checkbox  : {
            display : 'flex',
            '& svg' : {fontSize : '18px'},
            color   : isAvailable
                ? paletteColors.green
                : isAvailable
                    ? checkedElement.color
                    : uncheckedElement.color

        },
        title     : {
            fontWeight  : isAvailable ? 700 : 400,
            fontSize    : props?.textSize || {xs : '12px', sm : '16px'},
            paddingLeft : '4px'
        }
    };

    return (
        <Grid container width={'100%'} key={guid()} sx={{...styles.container}}>
            <Grid flex={1} sx={{...styles.checkbox}}>
                {
                    isAvailable
                        ? checkedElement.icon
                        : uncheckedElement.icon
                }
            </Grid>

            <Grid flex={props.featureFlex || 3} sx={{...styles.title}}>
                {featureName}
            </Grid>
        </Grid>
    );
}


interface IStoreProps
{
    store: IExtendedStore;
    locations: IPoint[];
    favouriteStores: string[];
    toggleFavourite: Function;
    onSelect?: Function;
}

export function DrawStore(props: IStoreProps): React.ReactElement {
    const {store, locations, favouriteStores, toggleFavourite, onSelect} = props;
    const navigate                                                       = useNavigate();

    const distanceKm  = (locations || []).find((loc) => loc.id === store.id)?.distance;
    const isFavourite = (favouriteStores || []).includes(store.id);
    const isStoreOpen = getStoreIsOpen(store, new Date());

    const features: { name: string; isAvailable: boolean; }[] = [
        {name : 'Pickup', isAvailable : store?.isCollectionEnabled || false},
        {name : 'Delivery', isAvailable : store?.isDeliveryEnabled || false},
        {name : 'Catering', isAvailable : store?.isCateringEnabled || false}
    ];

    const styles = {
        addressContainer : {
            '& .MuiGrid2-root' : {padding : 0}
        },
        button           : {
            display                 : 'flex',
            justifyContent          : 'end',
            '& .MuiButtonBase-root' : {
                ...fonts.portuguesa,
                fontSize   : {xs : '18px', sm : '25px'},
                width      : {xs : '110px', sm : '150px'},
                height     : {xs : '40px', sm : '48px'},
                fontWeight : '400'
            }
        }
    };

    return (
        <Grid container xs={12} key={guid()} className="storeDetail">
            <Grid xs={8}>
                <Grid container width="100%">
                    <Grid xs={12} className="storeName">
                        {store.storeName}
                    </Grid>
                    <Grid container xs={12} width={'100%'} sx={{...styles.addressContainer}} className="addressBlock">
                        <DrawAddress store={store} textAlign={'start'}/>
                    </Grid>
                    <Grid xs={12} display="flex" flexDirection="row" py={1}>
                        <Box className={isStoreOpen ? 'open' : 'closed'}>
                            {isStoreOpen ? 'Open:' : 'Closed:'}&nbsp;
                        </Box>

                        <Box>{getStoreTradingHours({store, time : new Date()})}</Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={4}>
                <Grid container width="100%" height="100%">
                    <Grid xs={12} display={'flex'} alignItems={'center'} justifyContent={'end'}>
                        <Grid xs={2} sx={{...locationsStyles.favourite}}>
                            <Box onClick={() => toggleFavourite(store.id)}>
                                {
                                    isFavourite
                                        ? <icons.starIcon/>
                                        : <icons.starOutlined/>
                                }
                            </Box>
                        </Grid>

                        <Grid xs={10} sx={locationsStyles.distance}>
                            {distanceKm && (
                                <Box sx={{fontSize : (distanceKm > 999) ? '14px' : '16px'}}>
                                    <img height={'15px'} src={images.mainPin} alt={''}/>
                                    {
                                        (distanceKm > 1)
                                            ? `${distanceKm.toFixed(2)}km`
                                            : `${(distanceKm * 1000).toFixed(0)}m`
                                    }
                                </Box>
                            )}
                        </Grid>
                    </Grid>

                    <Grid xs={12} sx={styles.button}>
                        {/* TODO: disable when orderType === 'delivery' and no delivery address provided ??? */}
                        <Button
                            onClick={() => onSelect?.call(this, store)}
                            variant="contained"
                        >
                            <Hidden smDown>Select</Hidden>
                            <Hidden smUp>Order</Hidden>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12}>
                <Grid container width={'100%'}>
                    {
                        (features || []).map((feature, idx): React.ReactElement => (
                            <Grid xs={3} width={'100%'} flex={idx === 0 ? 0.75 : idx === 2 ? 0.9 : 1} key={guid()}>
                                <DrawCheckedFeature
                                    isAvailable={feature.isAvailable}
                                    featureName={feature.name}
                                    checkedElement={{
                                        icon  : <icons.optionChecked/>,
                                        color : paletteColors.green
                                    }}
                                    uncheckedElement={{
                                        icon  : <icons.optionCancel/>,
                                        color : `${paletteColors.red}60`
                                    }}
                                />
                            </Grid>
                        ))
                    }

                    <Grid xs={3} flex={1} display={'flex'} alignItems={'center'} textAlign="right" paddingRight="10px">
                        <Box
							width={"100%"}
                            className="moreInfo"
                            onClick={() => jumpTo(`/locations/${store.id}`)}
                        >
                            <icons.errorIcon className="spin180"/>
                            More Info
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}