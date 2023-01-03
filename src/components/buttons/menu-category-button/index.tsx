import * as React   from 'react';
import {Button}     from '@mui/material';
import {useTheme}   from '@mui/material';
import {SxProps}    from '@mui/system';
import {Theme}      from '@mui/material/styles';
import {effects}    from '../.././../shared/styles';
import ProductCard1 from '../../products/product-card-1';

interface IMenuCategoryButtonProps
{
    imageUrl: string;
    title: string;
    onClick?: any; // React.MouseEvent<HTMLElement>;
    sx?: SxProps<Theme>;
}

export default function MenuCategoryButton(props: IMenuCategoryButtonProps): JSX.Element {
    const {imageUrl, title, onClick, sx} = props;

    const theme = useTheme();

    return (
        <Button
            variant={'contained'}
            onClick={onClick}
            sx={{
                '&:hover'       : {
                    ...effects.buttonShadow,
                    backgroundColor : (theme: Theme) => theme.palette.common.white
                },
                color           : theme.palette.common.black,
                backgroundColor : theme.palette.common.white,
                ...sx
            }}
        >
            <ProductCard1
                imageUrl={imageUrl}
                title={title}
            />
        </Button>
    );
}
