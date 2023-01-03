import React from 'react';

// MUI Components
import {CssBaseline}   from '@mui/material';
import {Box}           from '@mui/material';
import {Paper}         from '@mui/material';
import {useMediaQuery} from '@mui/material';
import {Theme}         from '@mui/material/styles';
import {ThemeProvider} from '@mui/material/styles';

import NestedMenu from '../../components/menus/nested-menu';

import {SxProps} from '@mui/system';

import {useSelector} from 'react-redux';

import theme from '../../theme';

import backgroundImageUrl from '../../assets/images/figma/backgrounds/textured/distressed-tile-white.png';

import StorePickerModal from '../../components/modals/store-picker';
import PageHeader       from '../headers/page-header';
import PageFooter       from '../footers/page-footer';


const styles = {
    page : {
        m : 0,
        p : 0,

        // Push footer to bottom of the screen (when not enough content on the screen)
        display          : 'grid',
        gridTemplateRows : 'auto 1fr auto',
        minHeight        : '100vh',
        backgroundImage  : `url(${backgroundImageUrl})`,
        backgroundRepeat : 'repeat'
    }
};

interface IPageProps
{
    sx?: SxProps<Theme>;
    children: React.ReactNode;
}

export default function Page(props: IPageProps): JSX.Element {
    const {children, sx} = props;

    // Redux states
    const appState = useSelector((state: any) => state.app);

    const isDesktop                = useMediaQuery(theme.breakpoints.up('lg'));
    const shouldShowMobileMainMenu = (!isDesktop && appState.isMainMenuOpen);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>

            <Paper elevation={0} sx={{...styles.page, ...sx}}>
                <PageHeader navMenu={appState.navMenu}/>

                {shouldShowMobileMainMenu
                    ? (
                        <Box
                            sx={{
                                width      : '100%',
                                height     : '100%',
                                color      : (theme) => theme.palette.common.white,
                                background : (theme) => theme.palette.common.black
                            }}
                        >
                            {/* TODO: add search input */}
                            <NestedMenu items={appState.navMenu}/>
                        </Box>
                    )
                    : (
                        <>
                            {/* Content */}
                            {children}

                            <PageFooter
                                navMenu={appState.navMenu}
                                socialLinks={appState.socialLinks}
                            />
                        </>
                    )
                }
            </Paper>

            {/* Global Modals */}
            <StorePickerModal/>
        </ThemeProvider>
    );
}
