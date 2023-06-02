import _                           from 'lodash';
import React                       from 'react';
import {Box}                       from '@mui/material';
import {SxProps}                   from '@mui/material';
import {Theme}                     from '@mui/material';
import {useMediaQuery}             from '@mui/material';
import {useTheme}                  from '@mui/material';
// import CarouselComponent           from 'src/components/banners/carousel/carousel';
import Carousel                    from 'react-material-ui-carousel';
// import paletteColors               from 'src/theme/paletteColors';
import TileComponent               from 'src/components/banners/carousel/tile';
// import {TextFieldsSharp}           from '@mui/icons-material';
import {extractFileFromContentful} from 'src/store/pages/pages';
// import {IMediaElement}             from 'src/store/pages/pages';
import {VMCarouselItem}            from '../../banners/carousel/vmCarousel';

export interface ICarousel
{
    carouselItems: VMCarouselItem[];
    indicators?: boolean;
    autoplay?: boolean;
    centerTitle?: boolean;
    title: string;
}

export function extractCarouselItemFromContentful(fields: any): VMCarouselItem | null {
    return _.isEmpty(fields) ? null : {
        title                 : fields.title,
        backgroundImage       : extractFileFromContentful(fields.backgroundImage?.fields?.file),
        backgroundImageHeight : fields.backgroundImageHeight,
        content               : fields.content
    };
};

export const extractCarouselFromContentful = (fields: any): ICarousel | null => {
    return _.isEmpty(fields) ? null : {
        carouselItems : (fields.carouselItems || [])
            .map((ci: any) => extractCarouselItemFromContentful(ci?.fields))
            .filter((ci: any) => !_.isEmpty(ci))
        ,
        title       : fields.title || '',
        centerTitle : fields.centerTitle || true,
        autoplay    : fields.autoplay || true,
        indicators  : fields.indicators || false
    };
};

interface IDrawCarouselComponentProps
{
    carousel: ICarousel;
    bannerHeightDesktop?: string;
    bannerHeightMobile?: string;
    sx?: SxProps<Theme>;
    sxTitle?: SxProps<Theme>;
}

export function DrawCarousel(props: IDrawCarouselComponentProps) {
    const {carousel, bannerHeightDesktop, bannerHeightMobile, /*sx,*/ sxTitle} = props;

    const theme   = useTheme();
    const smAndUp = useMediaQuery(theme.breakpoints.up('sm'));

    const styles = {
        carousel : {
            height                       : smAndUp
                ? bannerHeightDesktop || '216px'
                : bannerHeightMobile || '216px',
            width                        : '100vw',
            [theme.breakpoints.up('sm')] : {
                height : '672px'
            }
        }
    };

    return (
        <Box sx={{...styles.carousel}}>
            <Carousel
                height={'100%'}
                indicators={carousel?.indicators}
                autoPlay={carousel?.autoplay}
                sx={{display : 'flex', width : '100%', height : '100%', alignItems : 'center'}}
            >
                {(carousel?.carouselItems || [])
                    .filter((item: any) => !_.isEmpty(item))
                    .map((item, idx) => (
                        <TileComponent
                            overrideTitleStyles={sxTitle}
                            key={idx}
                            item={item}
                            centerTitle={carousel.centerTitle}
                        />
                    ))}
            </Carousel>
        </Box>
    );
}