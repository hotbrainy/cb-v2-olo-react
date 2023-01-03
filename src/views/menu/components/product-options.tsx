import React from 'react';

// MUI Components
import {Box}         from '@mui/material';
import {Card}        from '@mui/material';
import {CardContent} from '@mui/material';
import {CardMedia}   from '@mui/material';
import Grid          from '@mui/material/Unstable_Grid2';
import {Stack}       from '@mui/material';
import {Typography}  from '@mui/material';

import {asCurrency} from '../../../utils/filters';

// Global Static Assets
import backgroundImageUrl from '../../../assets/images/figma/backgrounds/textured/distressed-tile-white.png';

interface IProductOptionsProps
{
    product: IProduct;
}

const styles = {
    container : {
        m                : 0,
        p                : 0,
        backgroundImage  : `url(${backgroundImageUrl})`,
        backgroundRepeat : 'repeat'
    }
};


export default function ProductOptions(props: IProductOptionsProps): JSX.Element {
    const {product} = props;

    return (
        <Grid container sx={{...styles.container}}>
            <Grid xs={12}>
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
            </Grid>

            <Grid xs={12}>
                <Typography
                    variant="h6"
                    color="text.primary"
                    align="left"
                >
                    {product.name}
                </Typography>
            </Grid>

            <Grid xs={12}>
                <Stack direction="row" spacing={3}>
                    <Typography
                        variant="h6"
                        color="text.primary"
                        align="left"
                    >
                        {asCurrency(product.price/100)}
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.primary"
                        align="left"
                    >
                        {'4890 KJ'}
                    </Typography>
                </Stack>
            </Grid>
        </Grid>

        // <Box sx={{...styles.container}}>
        //     <Card
        //         elevation={0}
        //         sx={{
        //             display       : 'flex',
        //             flexDirection : {xs : 'row', lg : 'column'}
        //         }}
        //     >
        //         <CardMedia
        //             component={'img'}
        //             title={product.name}
        //             image={product.imageUrl}
        //             sx={{
        //                 objectFit : 'contain',
        //                 mx        : 'auto',
        //                 mb        : 2,
        //                 minHeight : {lg : '200px'},
        //                 height    : {xs : 120, lg : '100%'},
        //                 width     : {xs : 'auto', lg : '100%'}
        //             }}
        //         />
        //
        //         <CardContent sx={{py : 0}}>
        //             <Box sx={{}}>
        //                 <Typography
        //                     variant="h6"
        //                     color="text.primary"
        //                     align="left"
        //                 >
        //                     {product.name}
        //                 </Typography>
        //
        //                 {/*<Typography*/}
        //                 {/*    variant="subtitle1"*/}
        //                 {/*    color="text.secondary"*/}
        //                 {/*    align="left"*/}
        //                 {/*>*/}
        //                 {/*    {additionalInfo.singleItem}*/}
        //                 {/*</Typography>*/}
        //             </Box>
        //
        //             <Box sx={{mt : 2}}>
        //                 <Typography
        //                     variant="h6"
        //                     color="text.primary"
        //                     align="left"
        //                 >
        //                     {'Meals from'}
        //                 </Typography>
        //
        //                 {/*<Typography*/}
        //                 {/*    variant="subtitle1"*/}
        //                 {/*    color="text.secondary"*/}
        //                 {/*    align="left"*/}
        //                 {/*>*/}
        //                 {/*    {additionalInfo.mealDeal}*/}
        //                 {/*</Typography>*/}
        //             </Box>
        //         </CardContent>
        //     </Card>
        // </Box>;
    );
}
