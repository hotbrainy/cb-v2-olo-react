import React       from 'react';
import {useEffect} from 'react';
import {useState}  from 'react';

// MUI Components
import {Container} from '@mui/material';
import {Box}       from '@mui/material';
import Grid        from '@mui/material/Unstable_Grid2';

import {useTheme} from '@mui/material/styles';

import {useSelector} from 'react-redux';

// Global Components
import Page       from '../../components/page';
import HeroBanner from '../../components/banners/hero-banner';

// Local Static Assets
import heroImage from '../../assets/images/figma/backgrounds/wall-art.png';

// Local Components
//import {Content} from './components/content';


export default function LocationsPage(): JSX.Element {
    const theme = useTheme();

    const glassMapUrl         = 'https://www.google.com/maps/embed?'
        + 'pb=!1m18!1m12!1m3!1d3540.0824714808914!2d153.02650451431444!3d-27.466691723149207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915a1d1b300003%3A0x20ba68a1cedbbddc!2sGlass%20%26%20Co!5e0!3m2!1sen!2sau!4v1665022760381!5m2!1sen!2sau'
    ;
    const [mapUrl, setMapUrl] = useState(glassMapUrl);

    // useEffect(() => {
    //     setMapUrl(`https://maps.google.com/maps?` + [
    //         `width=100%`,
    //         `height=100%`,
    //         `hl=en`,
    //         `q=Brisbane`,
    //         `ie=UTF8`,
    //         `t=`,
    //         `z=14`,
    //         `iwloc=B`,
    //         `output=embed`
    //     ].join('&'));
    // });

    return (
        <Page>
            <Grid container>
                <Grid xs={12}>
                    <HeroBanner
                        // TODO: manage via contentful
                        //title={contentful.title}
                        //imageUrl={contentful.bannerImageUrl}
                        //sx={{backgroundColor : contentful.bannerBackgroundColor}}
                        title="Locations"
                        imageUrl={heroImage}
                    />
                </Grid>

                <Grid maxWidth="lg" xs={12} sx={{mx : 'auto'}}>
                    {/*<Container sx={{width : '100%'}}/>*/}

                    <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        title="map"
                        style={{
                            minHeight : '400px',
                            border    : 0
                        }}
                        // allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    >
                    </iframe>
                </Grid>
            </Grid>
        </Page>
    );
}
