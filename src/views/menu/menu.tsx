import _ from 'lodash';

import React       from 'react';
import {useState}  from 'react';
import {useEffect} from 'react';

// MUI Components
import Grid            from '@mui/material/Unstable_Grid2';
import {Box}           from '@mui/material';
import {Hidden}        from '@mui/material';
// import {CardMedia}     from '@mui/material';
import {Modal}         from '@mui/material';
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
// import {fonts}        from '../../shared/styles';
import heroImageUrl_1 from '../../assets/images/figma/backgrounds/menu-promo-banner-1.png';

// Redux
import {useSelector}           from 'react-redux';
// --
import {useAppDispatch}        from '../../store';
import {FAVOURITE_CATEGORY_ID} from '../../store/categories';
import {selectCategories}      from '../../store/categories';
import {toggleFavourite}       from '../../store/categories';
import {apiGetCategories}      from '../../store/categories';

import {subscriber} from '../../utils/message-service-bus';

import useConfig            from '../../components/useConfig';
import HorizontalMenu       from 'src/components/menus/horizontal-menu/horizontal-menu';
import {messageService}     from '../../utils/message-service-bus';
import {setCurrentCategory} from '../../store/categories';
import paletteColors        from 'src/theme/paletteColors';
// import backgroundImageUrl   from 'src/assets/images/figma/backgrounds/textured/distressed-tile-white.png';

import spinnerImage from 'src/assets/images/spinner.gif';

import {orderTypeToMenuType} from '../../store/basket';
import {setChannelLinkId}    from '../../store/basket';
import {usePromoCode}        from 'src/store/products';
import {useParams}           from 'react-router-dom';
import {settings}            from 'src/shared/config-settings';
import {apiGetSettings}      from 'src/store/settings/settings';
import {IContentfulPage}     from 'src/utils/contentful';
import {apiGetPage}          from 'src/store/pages/pages';
import {DrawNutrionInfo}     from '../nutrition-and-allergen/nutrition';
import {Close}               from '@mui/icons-material';

import {clearEditItem}     from '../../store/basket';
import {clearNutrientInfo} from '../../store/nutrition-and-allergen';
import useHasChanged       from 'src/hooks/useHasChanged';

export const productOptionsModalStyle = {
    position        : 'absolute' as 'absolute',
    top             : '50%',
    left            : '50%',
    transform       : 'translate(-50%, -50%)',
    width           : 970,
    maxWidth        : '100vw',
    maxHeight       : '100vh',
    overflow        : 'auto',
    borderRadius    : {xs : 0, sm : '12px'},
    p               : 0
    // backgroundImage: `url(${backgroundImageUrl})`,
    // backgroundRepeat: "repeat",
};

export default function MenuPage(): React.ReactElement {
    const theme    = useTheme();
    const config   = useConfig();
    const dispatch = useAppDispatch();

    const props = useParams();
    const promo = props.promo;

    useEffect(() => {
        if (promo) {
            dispatch(usePromoCode(promo));
        }
    }, []);

    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    // Page Redux states
    const pagesState = useSelector((state: any) => state.pages);

    const [pageContent, setPageContent] = useState<IContentfulPage | null | undefined>(undefined);

    const pageId = 'ordering-banner'.toLowerCase(); // let's ensure this is lowercase

    useEffect(() => {
        const contentPages = pagesState.contentful;

        if (_.isEmpty(contentPages)) {
            if ((contentPages === null) && !pagesState.loading) {
                dispatch(apiGetPage({config}));
            }

            return;
        }

        const targetPage: any = Object
            .values(contentPages)
            .find((page: any) => (page?.pageReference || '').toLowerCase() === pageId)
        ;

        // // Additional configuration to go here...
        // if (!_.isEmpty(targetPage?.sections)) {
        // }

        setPageContent(targetPage || null);
    }, [config, pagesState, pageId]);

    // Redux states
    const {viewMode}       = useSelector((state: any) => state.products);
    const categoriesState  = useSelector((state: any) => state.categories);
    const settingsState    = useSelector((state: any) => state.settings);
    const storesState      = useSelector((state: any) => state.stores);
    const {currentStore}   = storesState;
    const basketState      = useSelector((state: any) => state.basket);
    const categories       = useSelector((state: any) => selectCategories(state));
    const {currentProduct} = useSelector((state: any) => state.products);

    const {favourites} = categoriesState;

    useEffect(() => {
        const storeId = storesState.currentStore?.id;
        if (_.isEmpty(storeId) || _.isEmpty(basketState.orderType)) {
            // Nothing to do... need these to access the categories
            return;
        }

        if (_.isEmpty(categoriesState.categories)) {
            if ((categoriesState.categories === null) && !categoriesState.loading) {
                // menuType - {0: catering, 1: delivery, 2: collection}
                const menuType = orderTypeToMenuType(basketState.orderType);
                dispatch(apiGetCategories({config, storeId, menuType}));
            }

            return;
        }

        // Grab the channelLinkId from the first category
        dispatch(setChannelLinkId(categoriesState.categories[0].channelLinkId));
    }, [config, basketState, categoriesState, storesState]);

    useEffect(() => {
        // console.log('ss: ', settingsState);
        if (_.isEmpty(settings)) {
            if ((settings === null) && !settingsState.loading) {
                dispatch(apiGetSettings({config}));
            }

            return;
        }
    }, [config, settingsState]);

    let deepLinker = false;
    try {
        deepLinker = !_.isEmpty(currentProduct) && !_.isEmpty((new URLSearchParams(window.location.search)).get('dl'));
    }
    catch (err) {
        console.error(err);
    }

    const [productModalVisible, setProductModalVisible] = React.useState(deepLinker || false);

    function showProductModal(): void {
        setProductModalVisible(true);
    }

    function hideProductModal(): void {
        dispatch(clearEditItem(null));
        setProductModalVisible(false);
    }

    function hideNutrionalInfoModal(): void {
        dispatch(clearNutrientInfo(null));
        setNutritionalInfoOpen(false);
    }

    function showProductOptions() {
        if (isDesktop) {
            showProductModal();
        }
        else {
            // alert('TODO: (mobile-ui): navigate to product screen');
            window.location.href = '/product';
            console.warn('TODO: (mobile-ui): navigate to product screen');
        }
    }

    // Message-bus
    useEffect(() => {
        const subscription = subscriber.subscribe((msg) => {
            switch (msg.subject) {
                case 'products/currentProduct.updated':
                    msg.context?.product && showProductOptions();
                    break;

                default:
                    // console.log('msgbus(menu): ' + JSON.stringify({msg}));
                    break;
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // Selected Category
    const {currentCategory} = useSelector((state: any) => state.categories);

    function selectCategory(category: IProductCategory | null): void {
        dispatch(setCurrentCategory(category));

        // Broadcast a message to any subscribers
        messageService.emit({
            subject : 'categories/currentCategory.updated',
            context : {category}
        });
    }

    const [isDirty, setIsDirty] = useState(false);
    const doToggleFavourite     = (plu: string) => {
        setIsDirty(true);
        dispatch(toggleFavourite(plu));
    };

    const favsChanged = useHasChanged(favourites);

    useEffect(() => {
        if (isDirty && !categoriesState.loading) {
            const storeId       = storesState.currentStore?.id;
            const menuType      = orderTypeToMenuType(basketState.orderType);
            const hasFavCat     = !_.isEmpty(categories.find((cat: IProductCategory) => cat.id === FAVOURITE_CATEGORY_ID));
            const hasFavourites = !_.isEmpty(favourites);
            if (favsChanged) {
                if (hasFavourites) {
                    if (!hasFavCat) {
                        dispatch(apiGetCategories({config, storeId, menuType}));
                        setIsDirty(false);
                    }
                    else if (hasFavCat) {
                        dispatch(apiGetCategories({config, storeId, menuType}));
                        setIsDirty(false);
                    }
                }
            }
        }
    }, [favourites, categories, categoriesState, isDirty]);

    function unSelectCategory(): void {
        dispatch(setCurrentCategory(null));
    }

    const [nutritionalInfoOpen, setNutritionalInfoOpen] = useState(false);


    return (
        <Page footerType="shopping">
            <Grid container width={'100%'} height={'fit-content'}>
                <Grid width={'100%'} sx={{backgroundColor : paletteColors.white}}>
                    <Header
                        title="Taste The Good Times"
                        sx={{
                            fontFamily : 'Portuguesa Script',
                            pt         : {xs : 1, lg : 1},
                            pb         : {xs : 2, lg : 0}
                        }}
                    />
                    <Hidden smUp>
                        <Grid container maxWidth={'100vw'}>
                            {(viewMode !== 'grid')
                                ? (
                                    <Grid height={'fit-content'}>
                                        <HorizontalMenu
                                            items={categories}
                                            onSelected={selectCategory}
                                        />
                                    </Grid>
                                )
                                : (
                                    <Grid display="flex" flexDirection={'column'} sx={{paddingLeft : '8px'}}>
                                        <Grid flex={1}>
                                            <Typography
                                                onClick={() => unSelectCategory()}
                                                sx={{/*...fonts.portuguesa,* fontSize : '20px', cursor : 'pointer'}}
                                                     >
                                                     Categories {currentCategory && ' >'}
                                                     </Typography>
                                                     </Grid>

                                                     {currentCategory && (
                                                     <Grid flex={1}>
                                                     <Typography sx={{/*...fonts.portuguesa,*/ fontSize : '20px'
                                                }}>
                                                {currentCategory?.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Hidden>
                </Grid>

                <hr style={{width : '90%', height : '2px'}}/>
            </Grid>

            <Grid container maxWidth="lg" sx={{mx : 'auto', width : '100%'}}>
                <Grid xs={12} sx={{mt : 5, display : {xs : 'none', md : 'flex'}}}>
                    <Box
                        sx={{
                            ...effects.buttonShadow,
                            borderRadius    : '12px',
                            height          : '360px',
                            width           : '100%',
                            backgroundImage : `url(${heroImageUrl_1})`,
                            backgroundSize  : 'cover'
                        }}
                    >
                    </Box>
                </Grid>
            </Grid>


            {
                _.isEmpty(currentStore)
                    ? (
                        <>
                            {/*  TODO: alert User they need to select a store */}
                            <Grid sx={{mb : 5}}/>
                        </>
                    )
                    : _.isEmpty(categories)
                        ? (
                            <Grid
                                container
                                width="93vw"
                                minHeight="100px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginLeft="auto"
                                marginRight="auto"
                            >
                                <img src={spinnerImage} alt="Waiting"/>
                                <Typography variant="h6" sx={{fontSize : {xs : '15px', sm : '20px'}}}>
                                    Loading menu items please wait...
                                </Typography>
                            </Grid>
                        )
                        : (viewMode === 'grid')
                            ? (<GridView categories={categories}/>)
                            : (<ListView categories={categories}/>)
            }

            <Modal
                open={productModalVisible}
                onClose={hideProductModal}
                disableAutoFocus
                sx={{
                    padding      : 0,
                    outline      : 'none',
                    border       : '0 !important',
                    borderRadius : '20px !important'
                }}
                aria-labelledby="product-options-modal-title"
                aria-describedby="product-options-modal-description"
            >
                <Box
                    sx={{
                        ...productOptionsModalStyle,
                        width  : _.isEmpty(currentProduct?.subItems) ? 565 : 970,
                        border : 0
                    }}
                >
                    <Typography id="product-options-modal-title" hidden>
                        {currentProduct?.name || ''}
                    </Typography>

                    <Typography id="product-options-modal-description" hidden>
                        {currentProduct?.description || ''}
                    </Typography>

                    <ProductOptions
                        categoryName={currentCategory?.name}
                        product={currentProduct}
                        favourites={favourites || []}
                        favouriteClick={doToggleFavourite}
                        onClose={hideProductModal}
                        nutritionalInfoClick={() => setNutritionalInfoOpen(true)}
                    />
                </Box>
            </Modal>

            <Modal
                open={nutritionalInfoOpen}
                onClose={hideNutrionalInfoModal}
                aria-labelledby="nutrition-information-modal-title"
                aria-describedby="nutrition-information-modal-description"
            >
                <Box sx={{
                    ...productOptionsModalStyle,
                    width           : 970,
                    maxWidth        : {xs : '95vw', sm : '100vw'},
                    maxHeight       : '95vh',
                    padding         : {xs : '8px', sm : '24px'},
                    borderRadius    : '12px',
                    backgroundColor : paletteColors.white,
                    }}
                >
                    <Box
                        onClick={hideNutrionalInfoModal}
                        sx={{float : 'left', cursor : 'pointer'}}
                    >
                        <Close/>
                    </Box>

                    <Typography variant="h4" sx={{textAlign : 'center'}}>
                        Nutritional Information
                    </Typography>

                    <DrawNutrionInfo productPlu={currentProduct?.plu || ''}/>
                </Box>
            </Modal>
        </Page>
    );
}
