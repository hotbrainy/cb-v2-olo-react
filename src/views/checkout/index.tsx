import React from 'react';

// MUI Components
import {Container} from '@mui/material';
import Grid        from '@mui/material/Unstable_Grid2';
import {useTheme}  from '@mui/material/styles';

import {useSelector} from 'react-redux';

// Global Components
import Page       from '../../components/page';
import HeroBanner from '../../components/banners/hero-banner';

// Local Static Assets
import heroImage from '../../assets/images/figma/backgrounds/wall-art.png';

// Local Components
//import {Content} from './components/content';


export default function CheckoutPage(): JSX.Element {
    const theme = useTheme();

    return (
        <Page>
            <Grid container>
                <Grid xs={12}>
                    <HeroBanner
                        // TODO: manage via contentful
                        //title={contentful.title}
                        //imageUrl={contentful.bannerImageUrl}
                        //sx={{backgroundColor : contentful.bannerBackgroundColor}}
                        title="Checkout"
                        imageUrl={heroImage}
                    />
                </Grid>

                <Grid maxWidth="lg" xs={12}>
                    <Container sx={{width : '100%'}}/>
                </Grid>
            </Grid>
        </Page>
    );
}
