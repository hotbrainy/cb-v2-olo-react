import * as React from 'react';

// MUI Components
import {AppBar}    from '@mui/material';
import {Container} from '@mui/material';
import {Toolbar}   from '@mui/material';

import {useMediaQuery} from '@mui/material';
import {useTheme}      from '@mui/material/styles';

import DesktopContent from './content/desktop';
import MobileContent  from './content/mobile';


export interface IComponentProps
{
    navMenu: ReadonlyArray<INavigationItem>;
}

function Content(props: IComponentProps): JSX.Element {
    const theme     = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <>
            {
                isDesktop
                    ? (<DesktopContent navMenu={props.navMenu}/>)
                    : (<MobileContent navMenu={props.navMenu}/>)
            }
        </>
    );
}

export default function PageHeader(props: IComponentProps): JSX.Element {
    const theme = useTheme();

    const style = {
        backgroundColor : theme.palette.common.black
    };

    return (
        <>
            <AppBar position="static" enableColorOnDark sx={{...style}}>
                <Container maxWidth="lg" sx={{p : 1}}>
                    <Toolbar disableGutters>
                        <Content {...props}/>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
