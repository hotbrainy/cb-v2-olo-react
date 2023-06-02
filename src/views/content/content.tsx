import '../../../node_modules/swiper/swiper-bundle.min.css';

import _           from 'lodash';
import React       from 'react';
import {useEffect} from 'react';
import {useState}  from 'react';
import Grid        from '@mui/material/Unstable_Grid2';

// MUI Components
import {Box}           from '@mui/material';
import {Container}     from '@mui/material';
import {Paper}         from '@mui/material';
import {useMediaQuery} from '@mui/material';
import {useTheme}      from '@mui/material';

import {useSelector} from 'react-redux';

// Global Components
import Page             from '../../components/page';
// import underTitleRed    from 'src/assets/images/adornments/underTitleRed.svg';
import {useParams}      from 'react-router';
import useConfig        from 'src/components/useConfig';
import {useAppDispatch} from 'src/store';

import {apiGetPage}           from 'src/store/pages/pages';
import {setNavBarLinkDefault} from 'src/store/pages/page-helpers';
import {setVideoGroupDefault} from 'src/store/pages/page-helpers';

import {IContentfulPage} from 'src/utils/contentful';
import CarouselComponent from 'src/components/banners/carousel/carousel';
import {VMNavTile}       from 'src/components/menus/nav-swiper/nav-swiper';
import paletteColors     from 'src/theme/paletteColors';
import CallToAction      from 'src/components/homepage-actions';
import LoadingSpinner    from 'src/components/spinners/loading/loading';
import {fonts}           from 'src/shared/styles';
import brandLogo         from 'src/assets/images/figma/logos/brand-logo.svg';
import DrawSection       from './drawSection';
import {guid}            from 'src/utils/utils';

export default function ContentPage(): React.ReactElement {
    const props    = useParams();
    const pageId   = props.pageId;
    const theme    = useTheme();
    const config   = useConfig();
    const dispatch = useAppDispatch();
    const smAndUp  = useMediaQuery(theme.breakpoints.up('sm'));

    // Redux states
    const pagesState                    = useSelector((state: any) => state.pages);
    const [pageContent, setPageContent] = useState<IContentfulPage | null | undefined>(undefined);

    //#region Set up states for sections
    //#region VideoGroup
    const [vgSelectedItem, setVgSelectedItem] = useState(0);
    const changeVGSelectedItem                = (newItem: number) => {
        setVgSelectedItem(newItem);
    };
    //#endregion

    //#region NavBar
    const [iconMenuFocus, setIconMenuFocus] = useState(0);
    const focusIconMenu                     = (newFocus: VMNavTile) => {
        setIconMenuFocus(newFocus.id);
    };
    //#endregion
    //#endregion

    useEffect(() => {
        const contentPages = pagesState.contentful;

        if (_.isEmpty(contentPages)) {
            if ((contentPages === null) && !pagesState.loading) {
                dispatch(apiGetPage({config}));
            }

            return;
        }

        const targetPage: any = Object
            .values(contentPages)
            .find((page: any) => (page?.pageReference || '').toLowerCase() === pageId)
        ;

        // Additional configuration to go here...
        if (!_.isEmpty(targetPage?.sections)) {
            for (const section of targetPage.sections) {
                setVideoGroupDefault(section, setVgSelectedItem);
                setNavBarLinkDefault(section, setIconMenuFocus);
            }
        }

        setPageContent(targetPage || null);
    }, [config, pagesState, pageId]);

    const styles = {
        container1          : {
            paddingTop    : theme.spacing(3),
            paddingBottom : theme.spacing(3),
            minHeight     : '200px',
            display       : 'flex',
            flexDirection : 'column',
            fontFamily    : 'Matter'
        },
        carousel            : {
            height                       : smAndUp
                ? pageContent?.bannerHeightDesktop || '216px'
                : pageContent?.bannerHeightMobile || '216px',
            width                        : '100vw',
            [theme.breakpoints.up('sm')] : {
                height : '672px'
            }
        },
        tileText            : {
            color      : paletteColors.white,
            marginTop  : '50%',
            minWidth   : {xs : '270px', sm : '330px'},
            textAlign  : 'center',
            fontWeight : 700,
            fontSize   : {xs : '40px', sm : '24px', md : '36px', lg : '48px'},
            textShadow : '6px 6px 6px rgba(0, 0, 0, 0.7)'
        },
        tilePosition        : {
            borderRadius : '12px',
            width        : 'unset',
            margin       : {xs : 0, sm : '4px'}
        },
        actionButtonWrapper : {
            display                        : 'flex',
            position                       : 'relative',
            marginTop                      : '-100px',
            marginBottom                   : '-25px',
            [theme.breakpoints.down('lg')] : {
                marginTop    : '-75px',
                marginBottom : 0
            },
            [theme.breakpoints.down('sm')] : {
                marginTop    : 0,
                marginBottom : 0
            }
        },
        rewardTileHeader    : {
            letterSpacing : '-0.05em'
        },
        swiper              : {
            display                        : 'flex',
            width                          : '100%',
            '& .swiper-wrapper'            : {
                width : {sm : '100vw'}
            },
            '& .swiper-slide'              : {
                display        : 'flex',
                justifyContent : 'center'
            },
            '& .swiper-button-next'        : {
                backgroundColor : paletteColors.black,
                color           : paletteColors.white,
                height          : '40px',
                width           : '40px',
                borderRadius    : '50%'
            },
            '& .swiper-button-next::after' : {
                fontSize : '20px'
            },
            '& .swiper-button-prev'        : {
                backgroundColor : paletteColors.black,
                color           : paletteColors.white,
                height          : '40px',
                width           : '40px',
                borderRadius    : '50%'
            },
            '& .swiper-button-prev::after' : {
                fontSize : '20px'
            }
        }
    };

    const firstItemType     = _.isEmpty(pageContent?.sections)
        ? ''
        : (pageContent?.sections[0].contentTypeId || '')
    ;
    const excludeTopPadding = ['carouselGroup'].includes(firstItemType);


    return (
        <>
            {!_.isEmpty(pageContent) ? (
                <Page>
                    {(pageContent.bannerImage || pageContent.bannerMobile) && (
                        <Box sx={{...styles.carousel}}>
                            <CarouselComponent
                                items={[
                                    {
                                        title                 : pageContent.bannerTitle || '',
                                        backgroundImageURL    : smAndUp
                                            ? pageContent.bannerImage?.fields?.file?.url
                                            : pageContent.bannerMobile?.fields?.file?.url,
                                        backgroundImageHeight : smAndUp
                                            ? pageContent.bannerHeightDesktop
                                            : pageContent.bannerHeightMobile
                                    }
                                ]}
                                sxTitle={{
                                    ...fonts.comicBookBold,
                                    fontSize       : smAndUp ? '120px !important' : '60px !important',
                                    lineHeight     : smAndUp ? '125px !important' : '62px !important',
                                    textShadow     : `5px 5px 6px ${paletteColors.black} !important`,
                                    color          : `${paletteColors.white} !important`,
                                    justifyContent : 'center'
                                }}
                                sx={{display : 'flex', width : '100%', height : '100%'}}
                                centerTitle={true}
                                fancyFlame={true}
                            />
                            {pageContent.includeButtons && (
                                <Box sx={{...styles.actionButtonWrapper}}>
                                    <CallToAction includeFindOutMore={false} dispatch={dispatch}/>
                                </Box>
                            )}
                        </Box>
                    )}
                    <Grid xs={12} style={{maxWidth : '100vw'}}>
                        <Container
                            maxWidth={false}
                            disableGutters={true}
                            sx={{
                                ...styles.container1,
                                paddingTop : excludeTopPadding ? `0px` : 'inherit'
                            }}
                        >
                            {(pageContent.sections || []).map((section: any, idx: number) => (
                                <Grid
                                    key={guid()}
                                    width={'100%'}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    py={/^callToAction/.test(section.contentTypeId) ? 0 : 2}
                                >
                                    <DrawSection
                                        section={section}
                                        key={`section-${idx}`}
                                        focusIconMenu={focusIconMenu}
                                        iconMenuFocus={iconMenuFocus}
                                        vgSelectedItem={vgSelectedItem}
                                        changeVGSelectedItem={changeVGSelectedItem}
                                    />
                                </Grid>
                            ))}
                        </Container>
                    </Grid>
                </Page>
            ) : (
                <Page>
                    {(pagesState.loading || (pageContent === undefined)) ? (
                        <LoadingSpinner horizontalAlign="center" size={30} text={'Loading page...'}/>
                    ) : (
                        _.isEmpty(pageContent) && (
                            <Grid container width={'100%'}>
                                <Grid
                                    xs={12}
                                    width={'100%'}
                                    display="flex"
                                    alignItems={'center'}
                                    justifyContent="center"
                                >
                                    <Paper elevation={1} sx={{width : 300, height : 300, padding : '26px'}}>
                                        <Grid container width="100%">
                                            <Grid xs={12} display="flex" justifyContent="center">
                                                <img src={brandLogo} height={40} alt={''}/>
                                            </Grid>
                                            <Grid
                                                xs={12}
                                                display="flex"
                                                justifyContent="center"
                                                sx={{...fonts.comicBookBold}}
                                            >
                                                Sorry couldn't find that page
                                            </Grid>
                                            <Grid xs={12} display="flex" justifyContent="center">
                                                Nothing found
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        )
                    )}
                </Page>
            )}
        </>
    );
}
