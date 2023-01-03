import React from 'react';

// MUI Components
import {CardMedia} from '@mui/material';
import {Container} from '@mui/material';
import Grid        from '@mui/material/Unstable_Grid2';
import {useTheme}  from '@mui/material/styles';

import {useSelector} from 'react-redux';

// Global Components
import Page                   from '../../components/page';
// import HeroBanner from '../../components/banners/hero-banner';

// Local Static Assets
// import heroImage              from '../../assets/images/figma/backgrounds/wall-art.png';
import backgroundDesktopPromo from '../../assets/images/figma/backgrounds/home/Frame 1.png';
import backgroundMobilePromo  from '../../assets/images/figma/backgrounds/home/Frame 1611.png';

// Local Components
//import {Content} from './components/content';


export default function HomePage(): JSX.Element {
    const theme = useTheme();

    return (
        <Page>
            <Grid container>
                <Grid xs={12}>
                    {/* TODO: support mobile image in HeroBanner (via contentful) ??? */}
                    {/*<HeroBanner imageUrl={backgroundDesktopPromo}/>*/}
                    <CardMedia
                        component="img"
                        height="672"
                        image={backgroundDesktopPromo}
                        alt="promo-img"
                        sx={{objectFit : 'cover', display : {xs : 'none', md : 'flex'}}}
                    />
                    <CardMedia
                        component="img"
                        height="552"
                        image={backgroundMobilePromo}
                        alt="promo-img"
                        sx={{objectFit : 'cover', display : {xs : 'flex', md : 'none'}}}
                    />
                </Grid>

                <Grid maxWidth="lg" xs={12}>
                    <Container sx={{width : '100%'}}/>
                </Grid>
            </Grid>
        </Page>
    );
}
