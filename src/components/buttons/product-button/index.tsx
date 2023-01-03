import * as React   from 'react';
import {Button}     from '@mui/material';
import {useTheme}   from '@mui/material';
import {SxProps}    from '@mui/system';
import ProductCard2 from '../../products/product-card-2';
import {asCurrency} from '../../../utils/filters';
import {Theme}      from '@mui/material/styles';
import {effects}    from '../../../shared/styles';

interface IProductButtonProps
{
    product: IProduct;
    onClick?: any; // React.MouseEvent<HTMLElement>;
    sx?: SxProps<Theme>;
}


export default function ProductButton(props: IProductButtonProps): JSX.Element {
    const {product, onClick, sx} = props;

    const theme = useTheme();

    return (
        <Button
            variant={'contained'}
            onClick={onClick}
            sx={{
                '&:hover'       : {
                    ...effects.buttonShadow,
                    backgroundColor : theme.palette.common.white
                },
                width           : {xs : '100%', lg : 'inherit'},
                p               : 0,
                color           : theme.palette.common.black,
                backgroundColor : theme.palette.common.white,
                ...sx
            }}
        >
            <ProductCard2
                imageUrl={product.imageUrl}
                info1={{
                    title       : product.name,
                    description : asCurrency(product.price / 100) + ' 1234 KJ'
                }}
                info2={{
                    title       : 'Meals from',
                    description : '$13.99 1234 KJ'
                }}
            />
        </Button>
    );
};
