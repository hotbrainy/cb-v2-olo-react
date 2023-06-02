import _           from 'lodash';
import * as React  from 'react';
import {useEffect} from 'react';

// MUI Components
import Grid            from '@mui/material/Unstable_Grid2';
import {Button}        from '@mui/material';
import {Box}           from '@mui/material';
import {Skeleton}      from '@mui/material';
import {Stack}         from '@mui/material';
import {Typography}    from '@mui/material';
import {useMediaQuery} from '@mui/material';
import {useTheme}      from '@mui/material/styles';

import {Swiper}      from 'swiper/react';
import {SwiperSlide} from 'swiper/react';
import {Keyboard}    from 'swiper';
import {Mousewheel}  from 'swiper';
import {Navigation}  from 'swiper';
import {Pagination}  from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {documentToReactComponents} from '@contentful/rich-text-react-renderer';


// Global Components
import Page       from '../../components/page';
import HeroBanner from '../../components/banners/hero-banner';
import CareerFaqs from '../../components/faqs';

import {useSelector}              from 'react-redux';
import {useAppDispatch}           from '../../store';
import {apiGetCareersPageContent} from '../../store/careers';
import useConfig                  from '../../components/useConfig';


export default function CareersPage(): JSX.Element {
    const theme    = useTheme();
    const config   = useConfig();
    const dispatch = useAppDispatch();

    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    // Redux states
    const {contentful} = useSelector((state: any) => state.careers);

    useEffect(() => {
        if (_.isEmpty(contentful)) {
            dispatch(apiGetCareersPageContent({config}));
        }
    }, [dispatch, contentful]);

    // const applyNowButton = contentful.applyNowUrl
    //     ? (
    //         <Button
    //             variant={'contained'}
    //             color={'primary'}
    //             href={contentful.applyNowUrl}
    //             target={'_blank'}
    //             sx={{mt : 2, p : 2}}
    //         >
    //             {'Apply Now'}
    //         </Button>
    //     )
    //     : undefined
    // ;
    const applyNowButton = (
        <Button
            variant={'contained'}
            color={'primary'}
            href={contentful.applyNowUrl}
            target={'_blank'}
            disabled={!contentful.applyNowUrl}
            sx={{mt : 2, p : 2}}
        >
            {'Apply Now'}
        </Button>
    );

    return (
        <Page>
            <Grid container spacing={5} sx={{m : 0}}>
                <Grid xs={12} sx={{p : 0}}>
                    <HeroBanner
                        title={contentful.title}
                        imageUrl={contentful.bannerImageUrl}
                        sx={{backgroundColor : contentful.bannerBackgroundColor}}
                        extraContent={applyNowButton}
                    />
                </Grid>

                <Grid maxWidth={'lg'} xs={12} sx={{mx : 'auto', p : 0}}>
                    <Box sx={{p : 3, width : '100%'}}>
                        {
                            _.isEmpty(contentful.whyWorkHere)
                                ? (
                                    <Skeleton variant={'text'}/>
                                )
                                : (
                                    <Typography variant={'h2'} align={'center'} sx={{fontFamily : 'Cera'}}>
                                        {contentful.whyWorkHere.title}
                                    </Typography>
                                )
                        }
                    </Box>

                    <Box sx={{px : 3, width : '100%'}}>
                        {
                            _.isEmpty(contentful.whyWorkHere)
                                ? _.times(7, (ii: number) => (
                                    <Skeleton variant={'text'} key={`why-work-body-skeleton-${ii}`}/>
                                ))
                                : (
                                    <Typography
                                        variant={'subtitle1'}
                                        align={'center'}
                                        sx={{
                                            fontSize   : {xs : '20px', lg : '32px'},
                                            lineHeight : {xs : '24px', lg : '38px'}
                                        }}
                                    >
                                        {documentToReactComponents(contentful.whyWorkHere.body)}
                                    </Typography>
                                )
                        }
                    </Box>
                </Grid>

                <Grid maxWidth={'lg'} xs={12} sx={{mx : 'auto', p : 0}}>
                    <Box sx={{p : 3, width : '100%'}}>
                        {
                            (<Skeleton variant={'rectangular'} width={'100%'} height={'300px'}/>)
                        }
                    </Box>
                </Grid>

                <Grid maxWidth={'lg'} xs={12} sx={{mx : 'auto', p : 0}}>
                    <Box sx={{p : 3, width : '100%'}}>
                        <Typography variant={'h2'} align={'center'} sx={{fontFamily : 'Cera'}}>
                            {'Job Roles'}
                        </Typography>
                    </Box>

                    <Box sx={{p : 3, width : '100%'}}>
                        {
                            (<Skeleton variant={'rectangular'} width={'100%'} height={'300px'}/>)
                        }
                    </Box>
                </Grid>

                <Grid maxWidth={'lg'} xs={12} sx={{mx : 'auto', p : 0}}>
                    <Box sx={{p : 3, width : '100%'}}>
                        <Typography variant={'h2'} align={'center'} sx={{fontFamily : 'Cera'}}>
                            {'Application Process'}
                        </Typography>
                    </Box>

                    <Box sx={{p : 3, width : '100%'}}>
                        {
                            _.isEmpty(contentful.applicationProcess)
                                ? (
                                    <Skeleton variant={'rectangular'} width={'100%'} height={'300px'}/>
                                )
                                : (
                                    <Swiper
                                        spaceBetween={2}
                                        slidesPerView={isDesktop ? 4 : 1}
                                        keyboard={{enabled : true}}
                                        pagination={{clickable : true}}
                                        // mousewheel={true}
                                        navigation={true}
                                        modules={[Keyboard, Mousewheel, Navigation, Pagination]}
                                    >
                                        {contentful.applicationProcess.map((item: any, ii: number) => (
                                            <SwiperSlide
                                                key={`application-process-${ii}`}
                                                style={{
                                                    height        : 'auto',
                                                    paddingBottom : '1em'
                                                }}
                                            >
                                                <Stack
                                                    spacing={1}
                                                    sx={{
                                                        m               : 1,
                                                        height          : '100%',
                                                        backgroundColor : (theme) => theme.palette.common.white,
                                                        boxShadow       : '0 4px 8px 2px rgba(0, 0, 0, 0.2)'
                                                    }}
                                                >
                                                    <Box
                                                        textAlign={'left'}
                                                        sx={{
                                                            p               : '1em',
                                                            backgroundColor : (theme) => theme.palette.common.red
                                                        }}
                                                    >
                                                        <Typography
                                                            variant={'h4'}
                                                            sx={{
                                                                color      : (theme) => theme.palette.common.white,
                                                                fontSize   : {xs : '16px', lg : '20px'},
                                                                lineHeight : {xs : '19px', lg : '24px'}
                                                            }}
                                                        >
                                                            {/*{`${ii + 1}. ${item.title}`}*/}
                                                            <span style={{fontSize : '32px'}}>
                                                                    {`${ii + 1}. `}
                                                            </span>
                                                            {`${item.title}`}
                                                        </Typography>
                                                    </Box>

                                                    <Box textAlign={'left'} sx={{p : '0 1em'}}>
                                                        <Typography
                                                            variant={'subtitle1'}
                                                            sx={{
                                                                fontSize   : {xs : '14px', lg : '16px'},
                                                                lineHeight : '20px'
                                                            }}
                                                        >
                                                            {documentToReactComponents(item.body)}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                )
                        }
                    </Box>
                </Grid>

                <Grid maxWidth={'lg'} xs={12} sx={{mx : 'auto', p : 0}}>
                    <Box sx={{p : 3, width : '100%'}}>
                        {
                            (<Skeleton variant={'rectangular'} width={'100%'} height={'300px'}/>)
                        }
                    </Box>
                </Grid>

                <Grid maxWidth={'lg'} xs={12} sx={{mx : 'auto', p : 0}}>
                    <Box sx={{p : 3, width : '100%'}}>
                        <Typography variant={'h2'} align={'center'} sx={{fontFamily : 'Cera'}}>
                            {'Employee Treats'}
                        </Typography>
                    </Box>

                    <Box sx={{p : 3, width : '100%'}}>
                        {
                            _.isEmpty(contentful.perks)
                                ? (
                                    <Skeleton variant={'rectangular'} width={'100%'} height={'300px'}/>
                                )
                                : (
                                    <Swiper
                                        spaceBetween={2}
                                        slidesPerView={isDesktop ? 4 : 1}
                                        keyboard={{enabled : true}}
                                        pagination={{clickable : true}}
                                        // mousewheel={true}
                                        navigation={true}
                                        modules={[Keyboard, Mousewheel, Navigation, Pagination]}
                                    >
                                        {contentful.perks.map((perk: any, ii: number) => (
                                            <SwiperSlide
                                                key={`perk-${ii}`}
                                                style={{
                                                    height        : 'auto',
                                                    paddingBottom : '1em'
                                                }}
                                            >
                                                <Stack
                                                    spacing={1}
                                                    sx={{
                                                        m               : 1,
                                                        height          : '100%',
                                                        backgroundColor : (theme) => theme.palette.common.white,
                                                        boxShadow       : '0 4px 8px 2px rgba(0, 0, 0, 0.2)'
                                                    }}
                                                >
                                                    <Box textAlign={'center'} sx={{p : '1em 1em 0 1em'}}>
                                                        <img
                                                            src={perk.image}
                                                            style={{height : isDesktop ? '96px' : '72px'}}
                                                            alt={'perk-image'}
                                                        />
                                                    </Box>

                                                    <Box textAlign={'left'} sx={{p : '0 1em'}}>
                                                        <Typography
                                                            variant={'h4'}
                                                            sx={{
                                                                fontSize   : {xs : '16px', lg : '20px'},
                                                                lineHeight : {xs : '19px', lg : '24px'}
                                                            }}
                                                        >
                                                            {perk.title}
                                                        </Typography>
                                                    </Box>

                                                    <Box textAlign={'left'} sx={{p : '0 1em'}}>
                                                        <Typography
                                                            variant={'subtitle1'}
                                                            sx={{
                                                                fontSize   : {xs : '14px', lg : '16px'},
                                                                lineHeight : '20px'
                                                            }}
                                                        >
                                                            {documentToReactComponents(perk.body)}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                )
                        }
                    </Box>
                </Grid>

                <Grid maxWidth={'lg'} xs={12} sx={{mx : 'auto', p : 0}}>
                    {
                        _.isEmpty(contentful.faqs)
                            // Loading Skeleton
                            ? (<Skeleton variant={'rectangular'} width={'100%'} height={300}/>)
                            : (<CareerFaqs items={contentful.faqs} sx={{width : '100%'}}/>)
                    }
                </Grid>

                {/* ALL FAQs Button */}
                <Grid
                    maxWidth={'lg'}
                    xs={12}
                    display={'flex'}
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
