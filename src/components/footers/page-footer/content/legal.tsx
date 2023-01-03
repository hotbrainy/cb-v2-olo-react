import * as React from 'react';
import Grid       from '@mui/material/Unstable_Grid2';
import {Link}     from '@mui/material';
import {Stack}    from '@mui/material';
import {useTheme} from '@mui/material/styles';

export interface IComponentProps
{
}

export default function Legal(props: IComponentProps): JSX.Element {
    const theme = useTheme();

    const style = {
        color          : theme.palette.common.white,
        textDecoration : 'none'
    };

    return (
        <>
            <Grid
                maxWidth="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                xs={12}
            >
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    direction={{xs : 'column', lg : 'row'}}
                    spacing={{xs : 1, lg : 3}}
                >
                    <Link href={'/terms-and-conditions'} sx={{...style}}>
                        {'Terms and Conditions'}
                    </Link>
                    <Link href={'/privacy-policy'} sx={{...style}}>
                        {'Privacy Policy'}
                    </Link>
                </Stack>
            </Grid>
        </>
    );
}
