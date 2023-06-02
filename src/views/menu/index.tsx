import _ from 'lodash';

import React       from 'react';
import {useEffect} from 'react';

// MUI Components
import Grid            from '@mui/material/Unstable_Grid2';
import {Box}           from '@mui/material';
import {CardMedia}     from '@mui/material';
import {Divider}       from '@mui/material';
import {Modal}         from '@mui/material';
import {Skeleton}      from '@mui/material';
import {Typography}    from '@mui/material';
import {useMediaQuery} from '@mui/material';
import {useTheme}      from '@mui/material/styles';

// Local Components
import Header         from './components/header';
import GridView       from './components/grid-view';
import ListView       from './components/list-view';
import ProductOptions from './components/product-options';

// Global Components
import Page from '../../components/page';

import {effects}      from '../../shared/styles';
import heroImageUrl_1 from '../../assets/images/figma/backgrounds/menu-promo-banner-1.png';

// Redux
import {useSelector}      from 'react-redux';
// --
import {useAppDispatch}   from '../../store';
import {selectCategories} from '../../store/categories';
import {apiGetCategories} from '../../store/categories';

import {subscriber} from '../../utils/message-service-bus';

import useConfig from '../../components/useConfig';


export default function MenuPage(): JSX.Element {
    const theme    = useTheme();
    const config   = useConfig();
    const dispatch = useAppDispatch();

    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    // Redux states
    const {viewMode}       = useSelector((state: any) => state.products);
    const {currentStore}   = useSelector((state: any) => state.stores);
    const basketState      = useSelector((state: any) => state.basket);
    const categories       = useSelector((state: any) => selectCategories(state));
    // const {currentCategory} = useSelector((state: any) => state.categories);
    const {currentProduct} = useSelector((state: any) => state.products);

    const [activeStoreId, setActiveStoreId] = React.useState<string | null>(null);

    useEffect(() => {
        const deliverectId = _.isEmpty(currentStore) ? '' : (currentStore.attributes.deliverectId || '');

        // console.log('MOUNT: menu page - ' + JSON.stringify({
        //     activeStoreId,
        //     deliverectId,
        //     currentStore
        // }));

        const shouldRefreshCategories = deliverectId
            && (activeStoreId !== deliverectId)
            && _.isEmpty(categories)
        ;

        if (shouldRefreshCategories) {
            setActiveStoreId(deliverectId);
            dispatch(apiGetCategories({
                config,
                storeId  : deliverectId, // currentStore.id,
                menuType : 1 // Delivery (TODO: User to select the menu type
            }));
        }
    }, [dispatch, currentStore, categories, config, activeStoreId, setActiveStoreId]);


    const [productModalVisible, setProductModalVisible] = React.useState(false);
    const showProductModal                              = () => setProductModalVisible(true);
    const hideProductModal                              = () => setProductModalVisible(false);
    const productOptionsModalStyle                      = {
        position  : 'absolute' as 'absolute',
        top       : '50%',
        left      : '50%',
        transform : 'translate(-50%, -50%)',
        width     : 400,
        bgcolor   : 'background.paper',
        border    : '2px solid #000',
        boxShadow : 24,
        p         : 4
    };

    function showProductOptions() {
        if (isDesktop) {
            showProductModal();
        }
        else {
            // alert('TODO: (mobile-ui): navigate to product screen');
            console.warn('TODO: (mobile-ui): navigate to product screen');
        }
    }


    // Message-bus
    useEffect(() => {
        const subscription = subscriber.subscribe((msg) => {
            switch (msg.subject) {
                case 'products/currentProduct.updated':
                    msg.context && showProductOptions();
                    break;

                default:
                    // console.log('msgbus(menu): ' + JSON.stringify({msg}));
                    break;
            }
        });

        return (() => subscription.unsubscribe());
    });

    return (
        <Page>
            <Header
                title="Taste The Good Times"
                sx={{pt : {xs : 1, lg : 2}}}
            />

            <Divider sx={{border : (theme) => `1px solid ${theme.palette.common.grey}`}}/>

            <Grid container maxWidth="lg" sx={{mx : 'auto'}}>
                <Grid xs={12} sx={{mt : 5, display : {xs : 'none', md : 'flex'}}}>
                    <Box sx={{...effects.buttonShadow}}>
                        <CardMedia
                            component="img"
                            height="360"
                            image={heroImageUrl_1}
                            alt="hero-image-1"
                            sx={{objectFit : 'cover'}}
                        />
                    </Box>
                </Grid>
            </Grid>

            {
                _.isEmpty(categories)
                    ? (
                        <Skeleton variant={'rectangular'} width={'100%'} height={'500px'}/>
                    )
                    : ((viewMode === 'grid')
                            ? (<GridView categories={categories}/>)
                            : (<ListView categories={categories}/>)
                    )
            }


            <Modal
                open={productModalVisible}
                onClose={hideProductModal}
                aria-labelledby="product-options-modal-title"
                aria-describedby="product-options-modal-description"
            >
                <Box sx={productOptionsModalStyle}>
                    <Typography id="product-options-modal-title" hidden>
                        {currentProduct ? currentProduct.name : ''}
                    </Typography>
                    <Typography id="product-options-modal-description" hidden>
                        {currentProduct ? currentProduct.description : ''}
                    </Typography>
                    <ProductOptions product={currentProduct}/>
                </Box>
            </Modal>

        </Page>
    );
}
