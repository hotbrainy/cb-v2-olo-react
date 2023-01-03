import React        from 'react';
import Grid         from '@mui/material/Unstable_Grid2';
import {IconButton} from '@mui/material';
import {Link}       from '@mui/material';
import logo         from '../../../../../assets/images/figma/logos/chicken-treat-logo.svg';

interface IComponentProps
{
}

export default function Logo(props: IComponentProps): JSX.Element {
    return (
        <Grid
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            xs
            sx={{display : 'flex'}}
        >
            <IconButton component={Link} href="/" sx={{mx : 0, px : 0}}>
                <img src={logo} style={{height : '48px'}} alt="logo"/>
            </IconButton>
        </Grid>
    );
}
