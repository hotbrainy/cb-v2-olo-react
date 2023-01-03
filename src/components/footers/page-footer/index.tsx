import * as React         from 'react';
import Grid               from '@mui/material/Unstable_Grid2';
import {Box}              from '@mui/material';
import {useTheme}         from '@mui/material/styles';
import Copyright          from './content/copyright';
import Legal              from './content/legal';
import Logo               from './content/logo';
import SiteMap            from './content/sitemap';
import SocialMedia        from './content/social-media';
import backgroundImageUrl from '../../../assets/images/figma/backgrounds/textured/distressed-tile-grey.png';

export interface IComponentProps
{
    navMenu?: ReadonlyArray<INavigationItem>;
    socialLinks?: ReadonlyArray<INavigationItem>;
}

export default function PageFooter(props: IComponentProps): JSX.Element {
    const theme = useTheme();

    const style = {
        mx               : 'auto',
        my               : 0,
        p                : 0,
        width            : '100%',
        backgroundColor  : theme.palette.common.black,
        backgroundImage  : `url(${backgroundImageUrl})`,
        backgroundRepeat : 'repeat'
    };

    return (
        <>
            <Grid
                container
                direction="row"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{...style}}
            >
                <Logo/>
                <SiteMap navMenu={props.navMenu}/>
                <SocialMedia socialLinks={props.socialLinks}/>
                <Legal/>
                <Copyright/>
                <Box sx={{mb : 5}}/>
            </Grid>
        </>
    );
};
