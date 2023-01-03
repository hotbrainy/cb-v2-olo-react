import * as React    from 'react';
import {Box}         from '@mui/material';
import {Card}        from '@mui/material';
import {CardContent} from '@mui/material';
import {CardMedia}   from '@mui/material';
import {Typography}  from '@mui/material';


interface IProductCard2Info
{
    title: string;
    description: string;
}


interface IComponentProps
{
    imageUrl: string;
    info1: IProductCard2Info;
    info2: IProductCard2Info;
}

export default function ProductCard2(props: IComponentProps): JSX.Element {
    const {imageUrl, info1, info2} = props;

    return (
        <Card
            elevation={0}
            sx={{
                width         : '100%;',
                p             : 2,
                display       : 'flex',
                flexDirection : {xs : 'row', lg : 'column'}
            }}
        >
            <CardMedia
                component={'img'}
                title={info1.title}
                image={imageUrl}
                sx={{
                    objectFit : 'contain',
                    mx        : {xs : 0, lg : 'auto'},
                    mb        : {lg : 2},
                    minHeight : {lg : 200},
                    maxWidth  : {xs : 120, lg : 'initial'},
                    height    : {xs : 120, lg : '100%'},
                    width     : {xs : 'auto', lg : '100%'}
                }}
            />

            <CardContent
                sx={{
                    ml    : {xs : 3, lg : 0},
                    mt    : {xs : 'auto', lg : 5},
                    mb    : {xs : 'auto', lg : 'inherit'},
                    p     : '0 !important',
                    width : '100%'
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        color="text.primary"
                        align="left"
                        sx={{
                            mb         : 1,
                            fontSize   : {xs : '14px', lg : '32px'},
                            lineHeight : {xs : '17px', lg : '38px'}
                        }}
                    >
                        {info1.title}
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        align="left"
                        sx={{
                            fontSize   : {xs : '12px', lg : '24px'},
                            lineHeight : {xs : '16px', lg : '24px'}
                        }}
                    >
                        {info1.description}
                    </Typography>
                </Box>

                <Box sx={{mt : 2}}>
                    <Typography
                        variant="h6"
                        color="text.primary"
                        align="left"
                        sx={{
                            mb         : 1,
                            fontSize   : {xs : '12px', lg : '20px'},
                            lineHeight : {xs : '14px', lg : '24px'}
                        }}
                    >
                        {info2.title}
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        align="left"
                        sx={{
                            fontSize   : {xs : '12px', lg : '20px'},
                            lineHeight : {xs : '16px', lg : '24px'}
                        }}
                    >
                        {info2.description}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
