import * as _ from 'lodash';

import * as React from 'react';

// MUI Components
import Grid            from '@mui/material/Unstable_Grid2';
import Link            from '@mui/material/Link';
import {Stack}         from '@mui/material';
import {Typography}    from '@mui/material';
import {useMediaQuery} from '@mui/material';

// Local Components
import FixedMenu     from '../../../components/menus/fixed-menu';
import ProductButton from '../../../components/buttons/product-button';

// import {effects} from '../../../shared/styles';
import {fonts} from '../../../shared/styles';

import {paletteColors} from '../../../theme/paletteColors';


import {useTheme}       from '@mui/material/styles';
import {useSelector}    from 'react-redux';
import {useAppDispatch} from '../../../store';

import {messageService}         from '../../../utils/message-service-bus';
import {setCurrentProduct}      from '../../../store/products';
import {setCurrentCategory}     from '../../../store/categories';
import {selectCategoryProducts} from '../../../store/categories';


interface IListViewProps
{
    categories: ReadonlyArray<any>;
}

const styles = {
    sectionTitle : {
        ...fonts.ceraBlack,
        fontWeight : 900,
        fontSize   : '40px',
        lineHeight : '48px',
        color      : paletteColors.black
    }
};

export default function ListView(props: IListViewProps) {
    const {categories} = props;

    const theme    = useTheme();
    const dispatch = useAppDispatch();

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

    // const [products, setProducts] = React.useState<IProduct[]>([]);
    const products = useSelector((state: any) => {
        return currentCategory
            ? selectCategoryProducts(state, currentCategory.id)
            : null
            ;
    });

    // Selected Product
    // const {currentProduct} = useSelector((state: any) => state.products);

    function selectProduct(product: IProduct | null): void {
        dispatch(setCurrentProduct(product));

        // Broadcast a message to any subscribers
        messageService.emit({
            subject : 'products/currentProduct.updated',
            context : {product}
        });
    }


    return (
        <>
            <Grid container maxWidth="lg" sx={{my : 5, mx : 'auto', width : '100%'}}>
                <Grid xs={3} sx={{display : {xs : 'none', md : 'inherit'}, mpb : 0, mr : 5}}>
                    <Stack direction="column" alignItems="left" sx={{width : '100%'}}>
                        <Typography
                            gutterBottom
                            variant="h4"
                            align="left"
                            sx={{...styles.sectionTitle}}
                        >
                            Menu
                        </Typography>

                        <FixedMenu
                            items={categories}
                            onSelected={selectCategory}
                        />
                    </Stack>
                </Grid>

                <Grid xs>
                    <Stack direction="column" alignItems="left" sx={{width : '100%'}}>
                        <Typography
                            gutterBottom
                            variant="h4"
                            align="center"
                            sx={{
                                ...styles.sectionTitle,
                                display : {xs : 'none', md : 'flex'}
                            }}
                        >
                            {currentCategory ? currentCategory.name : 'No Products'}
                        </Typography>

                        <Grid container spacing={4} sx={{mpb : 0}}>
                            {products && products.map((product: IProduct) => (
                                <Grid display="flex" key={product.id} xs={12} md={4}>
                                    <ProductButton
                                        product={product}
                                        onClick={() => selectProduct(product)}
                                        sx={{
                                            width : '100%'
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}
