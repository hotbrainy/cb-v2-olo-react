import _           from 'lodash';
import React       from 'react';
import {useEffect} from 'react';

// MUI Components
import Grid            from '@mui/material/Unstable_Grid2';
import {Typography}    from '@mui/material';
import {Button}        from '@mui/material';
import {Skeleton}      from '@mui/material';
import {Stack}         from '@mui/material';
import {useMediaQuery} from '@mui/material';

// Global Components
import Page       from '../../components/page';
import HeroBanner from '../../components/banners/hero-banner';
import OrderFaqs  from '../../components/faqs';

// Local Components
import CateringOrderInfoItem from './components/catering-order-info-item';

import {useTheme} from '@mui/material/styles';

// Redux
import {useSelector}               from 'react-redux';
import {useAppDispatch}            from '../../store';
import {apiGetCateringPageContent} from '../../store/catering';
import {setStorePickerOpen}        from '../../store/app';
import {setOrderType}              from '../../store/basket';

import {documentToReactComponents} from '@contentful/rich-text-react-renderer';

import useConfig from '../../components/useConfig';
import {jumpTo}  from '../content/drawSection';

export default function CateringPage(): React.ReactElement {
    const theme    = useTheme();
    const config   = useConfig();
    const dispatch = useAppDispatch();

    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    // Redux states
    const cateringStore = useSelector((state: any) => state.catering);
    const {contentful}  = cateringStore;

    useEffect(() => {
        if (_.isEmpty(contentful)) {
            if ((contentful === null) && !cateringStore.loading) {
                dispatch(apiGetCateringPageContent({config}));
            }

            return;
        }
    }, [config, cateringStore, contentful]);

    function handleOrderCateringNow(): void {
        dispatch(setOrderType('catering'));

        if (isDesktop) {
            // Open the Modal
            dispatch(setStorePickerOpen(true));
        }
        else {
            // Navigate to the Locations Page
            jumpTo('/locations');
        }
    }

    return (
        <Page>
            <Grid container spacing={5} sx={{m : 0}}>
                <Grid xs={12} sx={{p : 0}}>
                    <HeroBanner
                        title={contentful?.title}
                        imageUrl={contentful?.bannerImageUrl}
                        sx={{backgroundColor : contentful?.bannerBackgroundColor || '#000000'}}
                    />
                </Grid>

                <Grid
                    maxWidth={'lg'}
                    xs={12}
                    sx={{
                        textAlign : 'center',
                        mx        : 'auto',
                        p         : 2
                    }}
                >
                    <Stack direction={'column'}>
                        {
                            _.isEmpty(contentful?.overview)
                                ? (
                                    // Loading Skeleton
                                    <>
                                        <Skeleton variant={'text'}/>
                                        <Skeleton variant={'text'}/>
                                        <Skeleton variant={'text'}/>
                                    </>
                                )
                                : (
                                    <Typography
                                        gutterBottom
                                        variant="h4"
                                        align="center"
                                        sx={{
                                            width : '100%',
                                            mx    : 'auto'
                                        }}
                                    >
                                        {documentToReactComponents(contentful?.overview)}
                                    </Typography>
                                )
                        }
                    </Stack>
                </Grid>

                {/* Order Now Button */}
                <Grid
                    maxWidth="lg"
                    xs={12}
                    display="flex"
                    alignItems={'center'}
                    justifyContent={'center'}
                    sx={{mx : 'auto', mb : 5, p : 2}}
                >
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        onClick={() => handleOrderCateringNow()}
                        sx={{p : 2}}
                    >
                        {'Order Now'}
                    </Button>
                </Grid>

                <Grid container xs={12} maxWidth="lg" spacing={3} sx={{mx : 'auto', p : 2}}>
                    {
                        // TODO: carousel ???
                        _.isEmpty(contentful?.orderingInfo)
                            // Loading Skeleton
                            ? _.times(3, (ii: number) => (
                                <Grid xs={12} md={4} key={`order-info-skeleton-${ii}`}>
                                    <>
                                        <Skeleton variant={'circular'}/>
                                        <Skeleton variant={'text'}/>
                                        <Skeleton variant={'text'}/>
                                    </>
                                </Grid>
                            ))
                            : ((contentful?.orderingInfo || []).map((info: any, ii: number) => (
                                <Grid xs={12} md={4} key={`order-info-${ii}`}>
                                    <CateringOrderInfoItem
                                        title={info.title}
                                        body={info.body}
                                        imageUrl={info.image}
                                    />
                                </Grid>
                            )))
                    }
                </Grid>

                {/* Order FAQs */}
                <Grid maxWidth="lg" xs={12} display="flex" sx={{mx : 'auto', px : 0}}>
                    {
                        _.isEmpty(contentful?.faqs)
                            // Loading Skeleton
                            ? (<Skeleton variant={'rectangular'} width={'100%'} height={300}/>)
                            : (<OrderFaqs items={contentful?.faqs}/>)
                    }
                </Grid>

                {/* ALL FAQs Button */}
                <Grid
                    maxWidth="lg"
                    xs={12}
                    display="flex"
                    alignItems={'center'}
                    justifyContent={'center'}
                    sx={{mx : 'auto', mb : 15, p : 2}}
                >
                    <Button variant={'contained'} color={'primary'} href={'/faqs'} sx={{p : 2}}>
                        {'See all FAQs'}
                    </Button>
                </Grid>
            </Grid>
        </Page>
    );
}
