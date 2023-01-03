import * as React    from 'react';
import {Box}         from '@mui/material';
import {Card}        from '@mui/material';
import {CardContent} from '@mui/material';
import {CardMedia}   from '@mui/material';
import Grid          from '@mui/material/Unstable_Grid2';
import {Typography}  from '@mui/material';

interface IComponentProps
{
    imageUrl: string;
    title: string;
}

export default function ProductCard1(props: IComponentProps): JSX.Element {
    const {imageUrl, title} = props;

    return (
        <Card
            elevation={0}
            sx={{
                p             : 2,
                display       : 'flex',
                flexDirection : {xs : 'row', lg : 'column'}
            }}
        >
            <Grid container>
                <Grid xs={12}>
                    <CardMedia
                        component={'img'}
                        title={title}
                        image={imageUrl}
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
                    <CardContent sx={{mt : 2, p : '0 !important'}}>
                        <Box>
                            <Typography
                                variant="h6"
                                color="text.primary"
                                align="center"
                                sx={{
                                    fontSize   : {xs : '16px', lg : '32px'},
                                    lineHeight : {xs : '19px', lg : '38px'}
                                }}
                            >
                                {title}
                            </Typography>
                        </Box>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
}
