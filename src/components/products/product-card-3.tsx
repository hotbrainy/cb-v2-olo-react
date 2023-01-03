import * as React    from 'react';
import {Box}         from '@mui/material';
import {Card}        from '@mui/material';
import {CardContent} from '@mui/material';
import {CardMedia}   from '@mui/material';
import {Typography}  from '@mui/material';
import Grid          from '@mui/material/Unstable_Grid2';
import {SxProps}     from '@mui/system';
import {Theme}       from '@mui/material/styles';


// TODO: determine where to get this
const additionalInfo = {
    singleItem : '$9.99 1234 KJ',
    mealDeal   : '$13.99 1234 KJ'
};

interface IComponentProps
{
    product: IProduct;
    sx?: SxProps<Theme>;
}

export default function ProductCard3(props: IComponentProps): JSX.Element {
    const {product, sx} = props;

    return (
        <Grid xs={12}>
            <Card
                elevation={0}
                sx={{
                    p             : 2,
                    display       : 'flex',
                    flexDirection : {xs : 'row', lg : 'column'}
                }}
            >
                <CardMedia
                    component={'img'}
                    title={product.name}
                    image={product.imageUrl}
                    sx={{
                        objectFit : 'contain',
                        mx        : 'auto',
                        mb        : 2,
                        minHeight : {lg : '200px'},
                        height    : {xs : 120, lg : '100%'},
                        width     : {xs : 'auto', lg : '100%'}
                    }}
                />

                <CardContent sx={{p : '0 !important'}}>
                    <Box>
                        <Typography
                            variant="h6"
                            color="text.primary"
                            align="left"
                        >
                            {product.name}
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            align="left"
                        >
                            {additionalInfo.singleItem}
                        </Typography>
                    </Box>

                    <Box sx={{mt : 2}}>
                        <Typography
                            variant="h6"
                            color="text.primary"
                            align="left"
                        >
                            {'Meals from'}
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            align="left"
                        >
                            {additionalInfo.mealDeal}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}
