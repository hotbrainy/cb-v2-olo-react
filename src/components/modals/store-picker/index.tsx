import _ from 'lodash';

import React       from 'react';
import {FormEvent} from 'react';
import {useEffect} from 'react';
import {useState}  from 'react';

// MUI Components
import Grid          from '@mui/material/Unstable_Grid2';
import {ButtonBase}  from '@mui/material';
import {Card}        from '@mui/material';
import {CardContent} from '@mui/material';
import {FormControl} from '@mui/material';
import {Modal}       from '@mui/material';
import {Stack}       from '@mui/material';
import {Theme}       from '@mui/material';
import {Typography}  from '@mui/material';
import SearchIcon    from '@mui/icons-material/Search';

import TextInput from '../../inputs/text-input';

import ButtonGroup from '../../buttons/button-group';
import StoreList   from './components/store-list';

// Global Static Assets
import backgroundImageUrl   from '../../../assets/images/figma/backgrounds/textured/distressed-tile-white.png';
import closeIcon            from '../../../assets/images/figma/icons/close-white.svg';
import {setStorePickerOpen} from '../../../store/app';
import {useAppDispatch}     from '../../../store';
import {useSelector}        from 'react-redux';

import {setOrderKindId} from '../../../store/basket';
import {apiGetStores}   from '../../../store/stores';
import useConfig        from '../../useConfig';

interface IComponentProps
{
}

// TODO: move this to a redux store
// async function requestUserLocation(): Promise<any> {
//     return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(
//             (position) => resolve(position),
//             (err) => reject(err),
//             {}
//         );
//     });
// }

export default function StorePickerModal(props: IComponentProps): JSX.Element {
    const config   = useConfig();
    const dispatch = useAppDispatch();

    // Redux states
    const appState    = useSelector((state: any) => state.app);
    const basketState = useSelector((state: any) => state.basket);
    const {stores}    = useSelector((state: any) => state.stores);

    // const showStorePickerModal = () => dispatch(setStorePickerOpen(true));
    const hideStorePickerModal = () => dispatch(setStorePickerOpen(false));

    const glassMapUrl         = 'https://www.google.com/maps/embed?'
        + 'pb=!1m18!1m12!1m3!1d3540.0824714808914!2d153.02650451431444!3d-27.466691723149207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915a1d1b300003%3A0x20ba68a1cedbbddc!2sGlass%20%26%20Co!5e0!3m2!1sen!2sau!4v1665022760381!5m2!1sen!2sau'
    ;
    const [mapUrl, setMapUrl] = useState(glassMapUrl);

    function onOrderingOptionSelected(optionId: string): void {
        dispatch(setOrderKindId(optionId));
    }

    const shouldShowCustomerAddress = (basketState.orderKindId !== 'pickup');

    function handleSubmit(event: FormEvent): void {
        event.preventDefault();
        console.log('TODO: search Customer address');
    }

    useEffect(() => {
        if (_.isEmpty(stores)) {
            dispatch(apiGetStores({config}));
        }
    }, [dispatch, stores, config]);

    const styles = {
        container : {
            position         : 'absolute',
            top              : '50%',
            left             : '50%',
            transform        : 'translate(-50%, -50%)',
            m                : 0,
            p                : 0,
            backgroundImage  : `url(${backgroundImageUrl})`,
            backgroundRepeat : 'repeat',
            border           : 'none', // '2px solid #000',
            boxShadow        : '0 4px 8px 2px rgba(0, 0, 0, 0.2)'
        }
    };

    return (
        <Modal
            open={appState.isStorePickerOpen}
            onClose={hideStorePickerModal}
            sx={{m : 0, p : 0}}
        >
            <Card elevation={0} sx={{...styles.container}}>
                <CardContent sx={{p : 0, boxShadow : '0 4px 8px 2px rgba(0, 0, 0, 0.2)'}}>
                    <Stack spacing={2} alignItems={'center'} sx={{p : 2}}>
                        {/* Title */}
                        <Typography
                            variant={'h2'}
                            align={'center'}
                            sx={{
                                fontFamily : 'Cera',
                                fontHeight : '48px',
                                lineHeight : '57px'
                            }}
                        >
                            {'Restaurants'}
                        </Typography>

                        {/* Ordering Option */}
                        <ButtonGroup
                            options={basketState.orderingOptions}
                            defaultSelectedId={basketState.orderKindId}
                            onSelected={onOrderingOptionSelected}
                        />

                        {/* Customer Address (delivery/catering) */}
                        {shouldShowCustomerAddress && (
                            <Grid container sx={{width : '100%'}}>
                                <Grid xs={12}>
                                    <FormControl
                                        variant={'standard'}
                                        onSubmit={handleSubmit}
                                        sx={{width : '100%'}}
                                    >
                                        <TextInput
                                            //id="deliveryAddress"
                                            inputProps={{
                                                autoFocus   : true,
                                                placeholder : 'Enter Your Address'
                                            }}
                                            startIcon={<SearchIcon sx={{ml : '10px'}}/>}
                                            sx={{
                                                color           : (theme: Theme) => theme.palette.common.coolGrey,
                                                backgroundColor : (theme: Theme) => theme.palette.common.lightGrey,
                                                borderRadius    : '10px',
                                                width           : '100%'
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        )}
                    </Stack>

                    <ButtonBase
                        onClick={() => hideStorePickerModal()}
                        sx={{
                            position : 'absolute',
                            left     : '1em',
                            top      : '1em'
                        }}
                    >
                        <img
                            src={closeIcon}
                            alt={'close-button-icon'}
                            style={{
                                width  : '48px',
                                height : '48px'
                            }}
                        />
                    </ButtonBase>
                </CardContent>

                <CardContent sx={{p : 0}}>
                    <Grid container maxWidth={'sm'} justifyContent={'center'} sx={{mx : 'auto'}}>
                        <Grid xs={12}>
                            <StoreList stores={stores}/>
                        </Grid>

                        {/*<Grid xs={12}>*/}
                        {/*    <iframe*/}
                        {/*        src={mapUrl}*/}
                        {/*        width="100%"*/}
                        {/*        height="100%"*/}
                        {/*        title="map"*/}
                        {/*        style={{*/}
                        {/*            minHeight : '400px',*/}
                        {/*            border    : 0*/}
                        {/*        }}*/}
                        {/*        // allowFullScreen=""*/}
                        {/*        loading="lazy"*/}
                        {/*        referrerPolicy="no-referrer-when-downgrade"*/}
                        {/*    >*/}
                        {/*    </iframe>*/}
                        {/*</Grid>*/}
                    </Grid>
                </CardContent>
            </Card>
        </Modal>
    );
}
