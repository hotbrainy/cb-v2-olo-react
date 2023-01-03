import React      from 'react';
import Grid       from '@mui/material/Unstable_Grid2';
import {useTheme} from '@mui/material/styles';
import Logo       from './logo';
import Menu       from './menu';
import Action     from './action';

interface IComponentProps
{
    navMenu: ReadonlyArray<INavigationItem>;
}

export default function Desktop(props: IComponentProps): JSX.Element {
    const theme = useTheme();

    const style = {
        width           : '100%',
        mx              : 'auto',
        my              : 0,
        p               : 0,
        backgroundColor : theme.palette.common.black
    };

    return (
        <>
            <Grid container direction="row" sx={{...style}}>
                <Logo/>
                <Menu items={props.navMenu}/>
                <Action/>
            </Grid>
        </>
    );
}
