import * as React   from 'react';
import {Button}     from '@mui/material';
import {useTheme}   from '@mui/material';
import {SxProps}    from '@mui/system';
import ProductCard3 from '../../products/product-card-3';
import {Theme}      from '@mui/material/styles';

interface ICustomiseProductProps
{
    product: IProduct;
    onClick?: any; // React.MouseEvent<HTMLElement>;
    sx?: SxProps<Theme>;
}


export default function CustomiseProduct(props: ICustomiseProductProps): JSX.Element {
    const {product, onClick, sx} = props;

    const theme = useTheme();

    return (
        // <Button
        //     variant={'contained'}
        //     onClick={onClick}
        //     sx={{
        //         width           : {xs : '100%', lg : 'inherit'},
        //         p               : 0,
        //         color           : theme.palette.common.black,
        //         backgroundColor : theme.palette.common.white,
        //         ...sx
        //     }}
        // >
        //     <ProductCard3
        //         sx={{...sx}}
        //         product={product}
        //     />
        // </Button>
        <ProductCard3
            sx={{...sx}}
            product={product}
        />
    );
};
