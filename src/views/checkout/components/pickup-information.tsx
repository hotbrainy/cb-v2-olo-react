import _      from 'lodash';
import moment from 'moment';

import React       from 'react';
import {useEffect} from 'react';
import {useState}  from 'react';
import {Box}       from '@mui/material';
import {Button}    from '@mui/material';
import {Skeleton}  from '@mui/material';
import {FormGroup} from '@mui/material';
import {Paper}     from '@mui/material';
import {SxProps}   from '@mui/material';
import {TextField} from '@mui/material';
import Grid        from '@mui/material/Unstable_Grid2';

import paletteColors from 'src/theme/paletteColors';
import {effects}     from 'src/shared/styles';
import {fonts}       from 'src/shared/styles';
// import {settings}    from 'src/shared/config-settings';

import CheckCircleOutlineIcon    from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon  from '@mui/icons-material/RadioButtonUnchecked';
import {CircleOutlined, FmdGood} from '@mui/icons-material';
import {TimePicker}              from '@mui/x-date-pickers';

import {checkoutStyles} from '../localStyles';
import {guid}           from '../../../utils/utils';

export interface IPickupData
{
    collectTime: 'ASAP' | 'SCHEDULE';
    pickupTime?: Date;
    additionalInformation?: string;
    dropType?: string;
}

export interface IPickupInformation
{
    store: IExtendedStore;
    orderType: OrderType;
    dropType?: string; //'LEAVE' | 'MEET' | 'OUTSIDE';
    collectTime: 'ASAP' | 'SCHEDULE';
    pickupTime: { hour: number; minute: number };
    distanceAway?: number | null;
    onChange: any;
    changeRestaurantButtonEvent: any;
    restaurantInfoButtonEvent: any;
    additionalInformation?: string;
    sxProps?: SxProps;
}

// function DrawTypes(props: { pickupTypes: IPickupTypes, showNegatives?: boolean }): React.ReactElement {
//     const {pickupTypes, showNegatives} = props;
//     // console.log('pick:', pickupTypes);
//     const styles = {
//         icon : {
//             height      : '18px',
//             width       : '18px',
//             marginRight : 0,
//             fill        : paletteColors.grey,
//             ' .active'  : {
//                 fill : paletteColors.green
//             }
//         }
//     };
//     return (
//         <Grid container flexDirection={'column'} sx={{padding : '0 !important'}} width="100%" className="storeTypes">
//             {pickupTypes && (pickupTypes.instore || showNegatives) && (
//                 <Grid sx={{width : '100%', padding : '0', paddingY : '2px'}}>
//                     {pickupTypes.instore
//                         ? <CircleOutlined sx={styles.icon}/>
//                         : <CheckCircleOutlineIcon sx={styles.icon} className={pickupTypes.instore ? 'active' : ''}/>
//                     }
//                     {' '}{`Pickup In store`}
//                 </Grid>
//             )}
//
//             {pickupTypes && (pickupTypes.driveThru || showNegatives) && (
//                 <Grid sx={{width : '100%', padding : '0', paddingY : '2px'}}>
//                     {pickupTypes.driveThru
//                         ? <CircleOutlined sx={styles.icon}/>
//                         : <CheckCircleOutlineIcon sx={styles.icon} className={pickupTypes.driveThru ? 'active' : ''}/>
//                     }
//                     {' '}{`Drive-thru`}
//                 </Grid>
//             )}
//
//             {pickupTypes && (pickupTypes.kerbside || showNegatives) && (
//                 <Grid sx={{width : '100%', padding : '0', paddingY : '2px'}}>
//                     {pickupTypes.kerbside
//                         ? <CircleOutlined sx={styles.icon}/>
//                         : <CheckCircleOutlineIcon sx={styles.icon} className={pickupTypes.kerbside ? 'active' : ''}/>
//                     }
//                     {' '}{`Pickup Kerbside`}
//                 </Grid>
//             )}
//         </Grid>
//     );
// }

export function getAmenities(amenities?: Amenities | null): IAmenity[] {
    return Object
        // Convert object to [key, value] array
        .entries(amenities || {})

        // Ensure the amenity name starts with 'have'
        .filter(([amenityName, isAvailable]: [string, boolean]) => /^have/i.test((amenityName || '').trim()))

        // Transform the result
        .map(([amenityName, isAvailable]: [string, any]) => ({
            name      : (amenityName || '').trim().replace(/^have/i, ''),
            available : isAvailable
        } as IAmenity))
        ;
}


export function DrawAmenities(props: { amenities: IAmenity[], showNegatives?: boolean }): React.ReactElement {
    const {amenities, showNegatives} = props;

    const styles = {
        icon : {
            height      : '18px',
            width       : '18px',
            marginRight : 0,
            fill        : paletteColors.grey,
            ' .active'  : {
                fill : paletteColors.green
            }
        }
    };

    return (
        <Grid container flexDirection={'row'} sx={{padding : '0 !important'}} width="100%" className="storeTypes">
            {(amenities || []).map((amenity: IAmenity) => {
                return (amenity.available || showNegatives) && (
                    <Grid xs={6} key={guid()} sx={{padding : '0px !important'}}>
                        <Grid flex={1}>
                            {amenity.available
                                ? <CheckCircleOutlineIcon sx={{...styles.icon, fill : paletteColors.green}}/>
                                : <CircleOutlined sx={styles.icon}/>
                            }
                        </Grid>

                        <Grid flex={8.5}>
                            {amenity.name}
                        </Grid>
                    </Grid>
                );
            })}
        </Grid>
    );
}

function DrawTradingHours(props: { store: IExtendedStore, small?: boolean }): React.ReactElement {
    const {store, small} = props;
    const day            = (new Date()).getDay();
    if (small) {
        const openTime  = _.get(store, `tradingHours[${day}].openTime`, '');
        const closeTime = _.get(store, `tradingHours[${day}].closeTime`, '');
        let opensAt     = openTime;
        let closesAt    = closeTime;
        if (!_.isEmpty(openTime) || openTime.indexOf(':') > -1) {
            const openHr = _.parseInt(openTime.split(':')[0]);
            const openMn = _.parseInt(openTime.split(':')[1]);
            opensAt      = moment().hour(openHr).minute(openMn).format(openMn !== 0 ? 'h:mma' : 'ha');
        }
        if (!_.isEmpty(closeTime) || closeTime.indexOf(':') > -1) {
            const closeHr = _.parseInt(closeTime.split(':')[0]);
            const closeMn = _.parseInt(closeTime.split(':')[1]);
            closesAt      = moment().hour(closeHr).minute(closeMn).format(closeMn !== 0 ? 'h:mma' : 'ha');
        }
        return (<span>{' '}{opensAt} - {closesAt}</span>);
    }
    else {
        const tradingHours = [
            _.get(store, `tradingHours[${day}].openTime`, ''),
            _.get(store, `tradingHours[${day}].closeTime`, '')
        ].join(' - ');

        return (<span>{tradingHours}</span>);
    }
}

function getTimeForPickup(time: { hour: number; minute: number }): string {
    const hr = (time.hour % 13);
    const mn = `${time.minute}`.padStart(2, '0');
    const an = (time.hour > 12) ? 'pm' : 'am';

    return `${hr}:${mn}${an}`;
}

function getTime(time: { hour: number; minute: number }): Date {
    const newTime = new Date();
    newTime.setHours(time.hour);
    newTime.setMinutes(time.minute, 0, 0);

    return newTime;
}


export function DrawPickupInformation(props: IPickupInformation) {
    const {
              store,
              orderType,
              collectTime,
              dropType              = 'LEAVE',
              pickupTime,
              distanceAway,
              onChange,
              changeRestaurantButtonEvent,
              restaurantInfoButtonEvent,
              additionalInformation = '',
              sxProps
          } = props;

    const localStyles = {
        ...checkoutStyles,
        form : {...sxProps}
    };

    // console.log('st:', store);

    const [pickup, setPickup] = useState<'ASAP' | 'SCHEDULE'>(collectTime);

    const [dropOffType, setDropOffType]       = useState<string>(dropType);
    const [additionalInfo, setAdditionalInfo] = useState<string>(additionalInformation);

    const [asapTime, setAsapTime]         = useState(pickupTime);
    const [time, setTime]                 = useState(pickupTime);
    const [scheduleTime, setScheduleTime] = useState<Date>(getTime(time));

    const [timePickerOpen, setTimePickerOpen] = useState<boolean>(false);


    function changePickup(value: 'ASAP' | 'SCHEDULE'): void {
        setPickup(value);
        setTimePickerOpen(value === 'SCHEDULE');
    }

    useEffect(() => {
        const pickupReturn: IPickupData = {
            collectTime           : pickup,
            pickupTime            : getTime((pickup === 'ASAP') ? asapTime : time),
            additionalInformation : additionalInfo,
            dropType              : dropOffType
        };

        onChange?.call(this, pickupReturn);
    }, [pickup, time, additionalInfo, dropOffType]);

    function changeTime(value: any): void {
        const newTime = {
            hour   : Number(value.format('H')),
            minute : Number(value.format('m'))
        };

        setTime(newTime);
        setScheduleTime(getTime(time)); // TODO: review this... should it be getTime(newTime) ???
    }


    // const closingTime = getOperatingTime(store, new Date(), true);
    const storeAddress = [
        _.get(store, 'storeAddress.addressComponents.streetName.value', '').trim(),
        _.get(store, 'storeAddress.addressComponents.suburb.value', '').trim(),
        _.get(store, 'storeAddress.addressComponents.state.value', '').trim(),
        _.get(store, 'storeAddress.addressComponents.postcode.value', '').trim()
    ].filter(p => !!p).join(', ').trim();

    return (
        <FormGroup>
            <Grid container width="100%" sx={{...localStyles.root, padding : '0 !important'}}>
                {/^delivery$/i.test(orderType || '') && (
                    <Grid container width="100%" sx={localStyles.form}>
                        <Grid
                            xs={12}
                            sx={{
                                ...fonts.portuguesa,
                                fontSize   : {xs : '32px', sm : '34px'},
                                lineHeight : {xs : '34px', sm : '36px'},
                                fontWeight : '700'
                            }}
                        >
                            {`Delivery Instructions`}
                        </Grid>

                        <Grid xs={4}>
                            <Button
                                variant={(dropOffType === 'LEAVE') ? undefined : 'outlined'}
                                className={(dropOffType === 'LEAVE') ? 'selected' : ''}
                                sx={localStyles.button}
                                onClick={() => setDropOffType('LEAVE')}
                            >
                                {`Leave at Door`}
                            </Button>
                        </Grid>

                        <Grid xs={4}>
                            <Button
                                variant={(dropOffType === 'MEET') ? undefined : 'outlined'}
                                className={(dropOffType === 'MEET') ? 'selected' : ''}
                                sx={localStyles.button}
                                onClick={() => setDropOffType('MEET')}
                            >
                                {`Meet at Door`}
                            </Button>
                        </Grid>

                        <Grid xs={4}>
                            <Button
                                variant={(dropOffType === 'OUTSIDE') ? undefined : 'outlined'}
                                className={(dropOffType === 'OUTSIDE') ? 'selected' : ''}
                                sx={localStyles.button}
                                onClick={() => setDropOffType('OUTSIDE')}
                            >
                                {`Meet Outside`}
                            </Button>
                        </Grid>

                        <Grid xs={12} sx={{paddingTop : '22px !important', paddingBottom : '12px !important'}}>
                            <TextField
                                placeholder="Additional Information"
                                label="Leave Additional Information"
                                value={additionalInformation}
                                onChange={(event) => setAdditionalInfo(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                )}

                <Grid container width="100%" sx={{...localStyles.form}}>
                    <Grid
                        xs={12}
                        sx={{
                            ...fonts.portuguesa,
                            fontSize   : '34px',
                            lineHeight : '36px',
                            fontWeight : '700'
                        }}
                    >
                        {/^delivery$/i.test(orderType || '') ? 'Delivery From' : 'Pickup From'}
                    </Grid>

                    <Grid xs={12}>
                        <Paper
                            elevation={1}
                            sx={{
                                width        : '100%',
                                minHeight    : '200px',
                                height       : '100%',
                                borderRadius : '14px',
                                padding      : '24px',
                                paddingRight : '10px'
                            }}
                        >
                            <Grid
                                container
                                width={{xs : 'auto', sm : '100%'}}
                                height={'100%'}
                                sx={{padding : '0 !important'}}
                                spacing={2}
                            >
                                <Grid xs={12} sm={6} padding={0} flexDirection="column">
                                    <Grid className="heading matter padBottom"
                                          paddingLeft={0}
                                          sx={{width : '100%', textAlign : 'left', fontSize : '20px !important'}}
                                    >
                                        {store?.storeName || <Skeleton variant="rectangular" width={200} height={25}/>}
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        sx={{
                                            padding       : '0 !important',
                                            fontSize      : '16px !important',
                                            flexDirection : {xs : 'column', sm : 'row'}
                                        }}
                                        className="matter padBottom"
                                    >
                                        {/*{'TODO: fix this ... '}*/}
                                        {storeAddress}
                                    </Grid>

                                    {distanceAway && (
                                        <Grid xs={12} paddingLeft={0} alignItems="end" className="padBottom">
                                            <Grid container width={'100%'}>
                                                <Grid sx={{
                                                    alignItems : 'center',
                                                    padding    : '0 !important'
                                                }}
                                                >
                                                    <Box
                                                        sx={{
                                                            color       : paletteColors.green,
                                                            fontWeight  : '700',
                                                            marginRight : '8px'
                                                        }}
                                                    >
                                                        {`Open:`}
                                                    </Box>

                                                    <DrawTradingHours store={store} small={true}/>
                                                </Grid>

                                                <Grid sx={{flexGrow : 1.1}}>
                                                    <FmdGood sx={{fill : paletteColors.red, height : '18px', width : '18px'}}/>
                                                    {
                                                        (distanceAway > 1)
                                                            ? `${distanceAway.toFixed(0)}km away`
                                                            : `${(distanceAway * 1000).toFixed(0)}m away`
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>

                                <Grid xs={12} sm={6} className="padBottom matter" sx={{alignItems : 'baseline !important'}}>
                                    <DrawAmenities
                                        amenities={getAmenities(store?.amenities)}
                                        showNegatives={false}
                                    />
                                </Grid>

                                <Grid xs={12} sm={6}>
                                    <Button
                                        variant="outlined"
                                        sx={localStyles.button}
                                        onClick={changeRestaurantButtonEvent}
                                    >
                                        {`Change Restaurant`}
                                    </Button>
                                </Grid>

                                <Grid xs={12} sm={6} justifyContent={'flex-end'}>
                                    <Button
                                        variant="outlined"
                                        sx={localStyles.button}
                                        onClick={restaurantInfoButtonEvent}
                                    >
                                        {`Restaurant Info`}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

                {/^(?:catering|delivery)$/i.test(orderType || '') && (
                    <Grid
                        xs={12}
                        sx={{
                            ...fonts.portuguesa,
                            fontSize   : '34px',
                            lineHeight : '36px',
                            fontWeight : '700'
                        }}
                    >
                        {/^delivery$/i.test(orderType || '') ? 'Delivery Time' : 'Pickup Time'}
                    </Grid>
                )}

                {/^(?:catering|delivery)$/i.test(orderType || '') && (
                    <Grid xs={12}>
                        <Paper
                            elevation={1}
                            sx={{
                                width        : '100%',
                                minHeight    : '200px',
                                height       : '100%',
                                borderRadius : '14px',
                                padding      : 0
                            }}
                        >
                            <Grid container width={'100%'} height={'100%'} sx={{padding : '0 !important'}}>
                                {/^delivery$/i.test(orderType || '') && (
                                    <Grid
                                        xs={12}
                                        height={'50%'}
                                        width={'100%'}
                                        sx={{borderBottom : `1px solid ${paletteColors.grey}`, padding : '0 !important'}}
                                    >
                                        <Grid xs={10} width={'100%'} className="padBottom">
                                            <Grid xs={12} flexDirection={'column'} className="padBottom">
                                                <Grid
                                                    xs={12}
                                                    className="heading portuguese padBottom"
                                                    sx={{fontSize : '20px !important'}}
                                                >
                                                    {`ASAP - ${getTimeForPickup(asapTime)}`}`
                                                </Grid>

                                                <Grid xs={12} className="padBottom matter">
                                                    {
                                                        /^delivery$/i.test(orderType || '')
                                                            ? `Your order will be delivered from ${getTimeForPickup(asapTime)} at the earliest.`
                                                            : `Your order will be ready for pickup by ${getTimeForPickup(asapTime)} at the earliest.`
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            xs={2}
                                            justifyContent="center"
                                            className="padBottom"
                                            sx={{cursor : 'pointer'}}
                                            onClick={() => changePickup('ASAP')}
                                        >
                                            {
                                                (pickup === 'ASAP')
                                                    ? <CheckCircleOutlineIcon sx={{fill : '#6ABEA0'}}/>
                                                    : <RadioButtonUncheckedIcon/>
                                            }
                                        </Grid>
                                    </Grid>
                                )}

                                <Grid xs={12} height={'50%'} sx={{padding : '0 !important'}}>
                                    <Grid xs={10} className="padBottom">
                                        <Grid xs={12} flexDirection={'column'} className="padBottom">
                                            <Grid
                                                xs={12}
                                                className="heading portuguese padBottom"
                                                sx={{fontSize : '20px !important'}}
                                            >
                                                {`Schedule for later`}
                                            </Grid>

                                            <Grid xs={12} className="padBottom matter">
                                                {
                                                    (pickup === 'ASAP')
                                                        ? (
                                                            /^delivery$/i.test(orderType || '')
                                                                ? `Schedule your order for delivery at a later time.`
                                                                : `Schedule your order for pickup at a later time.`
                                                        )
                                                        : (
                                                            <Grid
                                                                container
                                                                className="padBottom"
                                                                sx={{
                                                                    padding            : '0 !important',
                                                                    '& .MuiGrid2-root' : {padding : '0 !important'}
                                                                }}
                                                            >
                                                                <Grid className="padBottom">Scheduled for </Grid>
                                                                <Grid className="padBottom" sx={{marginLeft : '8px !important'}}>
                                                                    {getTimeForPickup(time)}
                                                                </Grid>
                                                            </Grid>
                                                        )
                                                }

                                                <TimePicker
                                                    label="Time"
                                                    value={scheduleTime}
                                                    open={timePickerOpen}
                                                    minutesStep={5}
                                                    onChange={changeTime}
                                                    onClose={() => setTimePickerOpen(false)}
                                                    PopperProps={{
                                                        sx : {
                                                            border : `1px solid ${paletteColors.black}`,
                                                            ...effects.buttonShadow
                                                        }
                                                    }}
                                                    renderInput={(params: any) => (
                                                        <TextField
                                                            sx={{
                                                                height                      : '0 !important',
                                                                width                       : '0 !important',
                                                                '& fieldset'                : {display : 'none'},
                                                                '& .MuiInputAdornment-root' : {display : 'none'},
                                                                '& .MuiInputBase-root'      : {
                                                                    border : '0 !important', backgroundColor : 'transparent !important'
                                                                }
                                                            }}
                                                            {...params}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        xs={2}
                                        justifyContent="center"
                                        className="padBottom"
                                        sx={{cursor : 'pointer'}}
                                        onClick={() => changePickup('SCHEDULE')}
                                    >
                                        {
                                            (pickup === 'SCHEDULE')
                                                ? <CheckCircleOutlineIcon sx={{fill : '#6ABEA0'}}/>
                                                : <RadioButtonUncheckedIcon/>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </FormGroup>
    );
}
