import React from 'react';

// MUI Components
import Grid       from '@mui/material/Unstable_Grid2';
import {useTheme} from '@mui/material/styles';

import {useSelector} from 'react-redux';

// Global Components
import Page       from '../../components/page';
import HeroBanner from '../../components/banners/hero-banner';

// Local Static Assets
import heroImage from '../../assets/images/figma/backgrounds/wall-art.png';

// Local Components
import Content from './components/content';


export default function SubscribePage(): JSX.Element {
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
                        title="The Flock"
                        imageUrl={heroImage}
                    />
                </Grid>

                <Grid xs={12}>
                    <Content
                        title="Join The Flock"
                        sx={{
                            maxWidth : 'lg',
                            width    : '100%',
                            mx       : 'auto',
                            pt       : 10,
                            pb       : 5
                        }}
                    />
                </Grid>
            </Grid>
        </Page>
    );
}
