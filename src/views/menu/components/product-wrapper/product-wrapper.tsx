import React                      from 'react';
import {useState}                 from 'react';
import {Box}                      from '@mui/material';
import {Modal}                    from '@mui/material';
import {Typography}               from '@mui/material';
import Grid                       from '@mui/material/Unstable_Grid2';
import {useSelector}              from 'react-redux';
import Page                       from 'src/components/page';
import ProductOptions             from '../product-options';
import {productOptionsModalStyle} from '../../menu';
import {Close}                    from '@mui/icons-material';
import {DrawNutrionInfo}          from 'src/views/nutrition-and-allergen/nutrition';
import {toggleFavourite}          from 'src/store/categories';
import {useAppDispatch}           from 'src/store';
import paletteColors from 'src/theme/paletteColors';
// import {messageService}           from 'src/utils/message-service-bus';

interface ProductWrapperProps
{
    prod?: IProduct;
}

const ProductWrapper = (props: ProductWrapperProps) => {
    const {prod}          = props;
    const dispatch        = useAppDispatch();
    const categoriesState = useSelector((state: any) => state.categories);
    const {favourites}    = categoriesState;

    const {currentProduct} = useSelector((state: any) => state.products);

    const productToDisplay = prod || currentProduct || null;

    const [nutritionalInfoOpen, setNutritionalInfoOpen] = useState(false);

    function nutritionalInfoClicked(): void {
        setNutritionalInfoOpen(true);
    }

    const [isDirty, setIsDirty] = useState(false);

    const doToggleFavourite = (plu: string) => {
        // console.log('dtf: ', plu);
        setIsDirty(true);
        dispatch(toggleFavourite(plu));

        // // Broadcast a message to any subscribers
        // messageService.emit({
        //     subject : 'categories/currentCategory.updated',
        //     context : {category}
        // });
    };

    return (
        <Page footerType="shopping">
            <Grid container width={'100%'}>
                {productToDisplay
                    ? (
                        <ProductOptions
                            product={productToDisplay}
                            isMobile={true}
                            favourites={favourites}
                            favouriteClick={doToggleFavourite}
                            nutritionalInfoClick={() => nutritionalInfoClicked()}
                        />
                    )
                    : (<Box>Nothing to display</Box>)
                }
            </Grid>
            <Modal
                open={nutritionalInfoOpen}
                //onClose={()=>setNutritionalInfoOpen(false)}
                aria-labelledby="nutrition-information-modal-title"
                aria-describedby="nutrition-information-modal-description"
            >
                <Box sx={{
                    ...productOptionsModalStyle,
                    width        : 970,
                    maxWidth     : {xs : '95vw', sm : '100vw'},
                    maxHeight    : '95vh',
                    padding      : {xs : '8px', sm : '24px'},
                    borderRadius : '12px',
                    backgroundColor : paletteColors.white,
                }}>
                    <Box
                        onClick={() => setNutritionalInfoOpen(false)}
                        sx={{
                            float  : 'left',
                            cursor : 'pointer'
                        }}
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
};

export default ProductWrapper;
