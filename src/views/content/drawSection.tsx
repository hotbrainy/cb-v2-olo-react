import _                               from 'lodash';
import React                           from 'react';
import Grid                            from '@mui/material/Unstable_Grid2';
import theme                           from 'src/theme';
import paletteColors                   from 'src/theme/paletteColors';
import {guid}                          from 'src/utils/utils';
import {documentToReactComponents}     from '@contentful/rich-text-react-renderer';
import {Box}                           from '@mui/material';
import {Hidden}                        from '@mui/material';
import {Paper}                         from '@mui/material';
import {SxProps}                       from '@mui/material';
import {Swiper}                        from 'swiper/react';
import {SwiperSlide}                   from 'swiper/react';
import {Navigation}                    from 'swiper';
import {Pagination}                    from 'swiper';
import {fonts}                         from 'src/shared/styles';
import VideoGroup                      from 'src/components/display/video-group/video-group';
import {IContentfulTwoColumnWithImage} from 'src/store/pages/pages';
import {ILinkGroup}                    from 'src/store/pages/pages';
import {INavBar}                       from 'src/store/pages/pages';
import {INavContentGroup}              from 'src/store/pages/pages';
import {IParagraph}                    from 'src/store/pages/pages';
import VideoCard                       from 'src/components/display/video-card/video-card';
import {IVideoCard}                    from 'src/components/display/video-card/video-card';
import {DrawTile}                      from 'src/store/pages/page-helpers';
import Paragraph                       from 'src/components/display/paragraph/paragraph';
import IconMenu                        from 'src/components/menus/icon-menu/icon-menu';
import FaqGroup                        from 'src/components/faqs';
import TwoColumn                       from 'src/components/display/two-column/two-column';
import {HeadingTitle}                  from '../menu/components/header';
import {DrawLinkTileGroup}             from 'src/components/display/link-tile-group/link-tile-group';
import {DrawAdventureTile}             from 'src/components/display/adventure-tile-group/adventure-tile-group';
import {DrawAdventureTileGroup}        from 'src/components/display/adventure-tile-group/adventure-tile-group';
import {DrawFullWidthImageBanner}      from 'src/components/display/full-width-image-banner/full-width-image-banner';
import {DrawWhatsNewTileGroup}         from 'src/components/display/whats-new-tile-group/whats-new-tile-group';
import {DrawCallToAction}              from 'src/components/display/call-to-action/call-to-action';
import {DrawCallToActionGroup}         from 'src/components/display/call-to-action/call-to-action';
import DrawRewardTierPanel             from 'src/components/display/reward-tier-panel/reward-tier-panel';
import {DrawRewardTierTile}            from 'src/components/display/reward-tier-panel/reward-tier-panel';
import {DrawColouredBlock}             from 'src/components/display/coloured-block/coloured-block';
import {DrawCarousel}                  from 'src/components/display/carousel/carousel';
import {IVideoBanner}                  from 'src/components/banners/video/video-banner';
import {DrawRoleGroup}                 from 'src/components/display/role-tile-group/role-tile-group';

interface IDrawSectionProps
{
    section: any;
    changeVGSelectedItem?: any;
    vgSelectedItem?: number;
    focusIconMenu?: any;
    iconMenuFocus?: number;
    sx?: SxProps;
}

export function jumpTo(url?: string | null, newWindow?: boolean): void {
    if (_.isEmpty((url || '').trim())) {
        return;
    }

    if (newWindow) {
        window.open(url!, '_blank');
        return;
    }

    window.location.href = url!;
}

export function getFontFamily(value?: string | null): string {
    const defaultValue: string = 'cera black';

    const values: Record<string, string> = {
        'PORTUGUESA'        : 'Portuguesa Caps',
        'PORTUGUESA SCRIPT' : 'Portuguesa Script',
        'MATTER'            : 'Matter',
        'MATTER ITALIC'     : 'Matter Italic',
        'MATTER BLACK'      : 'Matter Black',
        'COMICBOOK'         : 'comic book',
        'COMIC BOOK'        : 'comic book',
        'COMICBOOKBOLD'     : 'comic book bold',
        'COMIC BOOK BOLD'   : 'comic book bold'
    };

    return values[(value || '').toUpperCase()] || defaultValue;
}

export function getJustification(value?: string | null): string {
    const defaultValue: string = 'center';

    const values: Record<string, string> = {
        'LEFT'  : 'start',
        'START' : 'start',
        'END'   : 'end',
        'RIGHT' : 'end'
    };

    return values[(value || '').toUpperCase()] || defaultValue;
}

export const interSectionGap: number = 4;


export default function DrawSection(props: IDrawSectionProps): React.ReactElement {
    const {sx, section, changeVGSelectedItem, vgSelectedItem, focusIconMenu, iconMenuFocus} = props;

    // const windowSize = useRef([window.innerWidth, window.innerHeight]);
    // const smAndUp    = useMediaQuery(theme.breakpoints.up('sm'));

    const styles = {
        container1          : {
            ...fonts.matter,
            paddingTop    : theme.spacing(3),
            paddingBottom : theme.spacing(3),
            minHeight     : '200px'
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

    const contentTypeId = section?.contentTypeId || '';
    //console.log('draw: ', contentTypeId, section);
    switch (contentTypeId) {
        case 'videoBanner': {
            const thisItem: IVideoBanner = section.videoBanner;
            return (
                <Grid
                    xs={12}
                    className={thisItem?.fullWidth ? '' : 'theme'}
                    width="100%"
                >
                    <video
                        loop
                        muted={thisItem?.autoplay}
                        autoPlay={thisItem?.autoplay}
                        controls={!thisItem?.autoplay}
                        width={'100%'}
                    >
                        <source src={thisItem?.video?.file?.url} type="video/mp4"/>
                    </video>
                </Grid>
            );
        }

        case 'carouselGroup': {
            const thisItem = section.carouselGroup;
            return (
                <DrawCarousel
                    carousel={thisItem}
                    sxTitle={{fontSize : {xs : '40px', sm : '100px'}}}
                />
            );
        }

        case 'carousel': {
            const thisItem = section.carousel;
            return (
                <DrawCarousel carousel={thisItem}/>
            );
        }

        case 'colouredBlock': {
            const thisItem = section.colouredBlock;
            return (
                <DrawColouredBlock colouredBlock={thisItem}/>
            );
        }

        case 'callToAction': {
            const thisItem = section.callToAction;
            return (
                <DrawCallToAction callToAction={thisItem}/>
            );
        }
        case 'callToActionGroup': {
            const thisItem = section.callToActionGroup;
            return (
                <DrawCallToActionGroup callToActionGroup={thisItem}/>
            );
        }

        case 'whatsNewTileGroup': {
            const thisItem = section.whatsNewTileGroup;
            return (
                <DrawWhatsNewTileGroup whatsNewTileGroup={thisItem}/>
            );
        }

        case 'ctFullWidthImageBanner':
        case 'fullWidthImageBanner': {
            const thisItem = section.fullWidthImageBanner || section.ctFullWidthImageBanner;
            return (
                <DrawFullWidthImageBanner fullWidthImageBanner={thisItem}/>
            );
        }

        case 'linkTileGroup': {
            const thisItem = section.linkTileGroup;
            return (
                <DrawLinkTileGroup linkTileGroup={thisItem}/>
            );
        }
        case 'roleGroup': {
            // console.log('rg: ', section);
            const thisItem = section.roleGroup;
            return (
                <DrawRoleGroup roleGroup={thisItem}/>
            );
        }

        case 'opoAdventureTileGroup':
        case 'adventureTileGroup': {
            const thisItem = section.adventureTileGroup || section.opoAdventureTileGroup;
            return (
                <DrawAdventureTileGroup adventureTileGroup={thisItem}/>
            );
        }

        case 'opoAdventureTile':
        case 'adventureTile': {
            const thisItem = section.adventureTile || section.opoAdventureTile;
            return (
                <DrawAdventureTile
                    adventureTile={thisItem}
                />
            );
        }

        case 'opoRewardTierPanel': {
            const thisItem = section.opoRewardTierPanel;
            return (
                <DrawRewardTierPanel rewardTierPanel={thisItem}/>)
                ;
        }

        case 'opoRewardTierTile': {
            const thisItem = section.opoRewardTierTile;
            return (
                <DrawRewardTierTile rewardTierTile={thisItem}/>
            );
        }

        case 'opoPerksGroup': {
            const thisItem = section.opoPerksGroup;
            if (!_.isEmpty(thisItem)) {
                return (
                    <Grid
                        key={guid()}
                        container
                        className="theme"
                        width="100%"
                        display="flex"
                        justifyContent={getJustification(thisItem?.justification || '')}
                        sx={{...styles.swiper}}
                    >
                        <Hidden smUp>
                            <Swiper
                                key={guid()}
                                autoHeight={true}
                                direction={'horizontal'}
                                pagination={true}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                            >
                                {(thisItem?.perksTiles || [])
                                    .filter((p: any) => !_.isEmpty(p))
                                    .map((opoPerksTile: any) => (
                                        <SwiperSlide key={guid()}>
                                            <DrawSection
                                                section={{contentTypeId : 'opoPerksTile', opoPerksTile}}
                                            />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </Hidden>

                        <Hidden smDown>
                            {(thisItem?.perksTiles || [])
                                .filter((p: any) => !_.isEmpty(p))
                                .map((opoPerksTile: any, iidx: number) => (
                                    <DrawSection
                                        section={{contentTypeId : 'opoPerksTile', opoPerksTile}}
                                        key={`section-${iidx}`}
                                    />
                                ))}
                        </Hidden>
                    </Grid>
                );
            }
            break;
        }

        case 'opoPerksTile': {
            const thisItem = section.opoPerksTile;
            if (!_.isEmpty(thisItem)) {
                return (
                    <Paper
                        key={guid()}
                        sx={{
                            width        : {sm : '272px', xs : '240px'},
                            minHeight    : {sm : '335px', xs : '300px'},
                            margin       : '8px',
                            padding      : '20px',
                            borderRadius : '14px',
                            ...fonts.matter,
                            fontSize : '12px'
                        }}
                    >
                        <Grid container width="100%" height="100%">
                            <Grid
                                xs={12}
                                display="flex"
                                justifyContent={'center'}
                                alignItems={'start'}
                                sx={{fontWeight : '700', fontSize : '16px'}}
                            >
                                {!_.isEmpty(thisItem?.badge) && (
                                    <img src={thisItem.badge?.file?.url} alt="perk badge"/>
                                )}
                            </Grid>

                            <Grid
                                xs={12}
                                display="flex"
                                justifyContent={'center'}
                                alignItems={'start'}
                                sx={{
                                    ...fonts.portuguesa,
                                    fontSize   : '35px',
                                    lineHeight : '38px',
                                    fontWeight : '700',
                                    textAlign  : 'center'
                                }}
                            >
                                {thisItem?.heading || ''}
                            </Grid>

                            <Grid
                                xs={12}
                                display="flex"
                                justifyContent={'center'}
                                alignItems={'center'}
                                flexDirection="column"
                                sx={{
                                    ...fonts.portuguesa,
                                    fontSize   : '14px',
                                    lineHeight : '16px',
                                    textAlign  : 'center',
                                    paddingTop : '18px'
                                }}
                            >
                                {thisItem?.subtext || ''}
                            </Grid>
                        </Grid>
                    </Paper>
                );
            }
            break;
        }

        case 'oportoFancyTitle': {
            const ft = section.oportoFancyTitle;
            // console.log('ft: ', ft);
            if (!_.isEmpty(ft)) {
                return (
                    <HeadingTitle title={ft?.title || ''} isBold={ft?.isBold}/>
                );
            }
            break;
        }

        case 'oportoTitle': {
            const thisItem = section.oportoTitle;
            if (!_.isEmpty(thisItem)) {
                return (
                    <HeadingTitle
                        title={thisItem.title || ''}
                        isBold={thisItem.isBold}
                        isBasic={true}
                        sx={sx}
                    />
                );
            }
            break;
        }

        case 'linkGroup': {
            const linkGroup: ILinkGroup | null = _.get(section, 'linkGroup', null);
            if (!_.isEmpty(linkGroup)) {
                const height  = linkGroup.height || 264;
                // const width   = linkGroup.width || 360;
                const justify = linkGroup.justifyContent || 'center';
                return (
                    <Grid
                        className="theme"
                        xs={12}
                        mt={interSectionGap}
                        display="flex"
                        flexDirection={{xs : 'column', sm : 'row'}}
                        justifyContent={justify}
                    >
                        {(linkGroup?.linkBlocks || [])
                            .filter((lk: any) => !_.isEmpty(lk))
                            .map((lk, idx) => (
                                <Grid
                                    key={`lkt-${idx}`}
                                    xs={12}
                                    sm={4}
                                    height={{xs : `${height}px`, sm : `${height}px`}}
                                    mt={{xs : 1, sm : 0}}
                                    mb={{xs : 1, sm : 0}}
                                >
                                    <DrawTile
                                        url={lk?.linkToUrl}
                                        item={{
                                            title              : lk?.heading || '',
                                            backgroundImageURL : lk?.backgroundImage?.file?.url
                                        }}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                );
            }
            break;
        }

        case 'paragraph': {
            const thisItem: IParagraph = section.paragraph;
            if (!_.isEmpty(thisItem)) {
                return (
                    <Grid className="theme" fontFamily={'Matter'} xs={12} mt={interSectionGap} justifyContent={'center'} sx={sx}>
                        <Box sx={{width : thisItem.width || '100%'}}>
                            <Paragraph
                                paragraph={{
                                    showHeading : thisItem.showHeading,
                                    heading     : thisItem.heading,
                                    docToNode   : thisItem.content
                                }}
                                justifyContent={thisItem.content_justify}
                                contentSx={{
                                    justifyContent : thisItem.content_justify,
                                    textAlign      : thisItem.content_justify
                                }}
                                headerSx={{justifyContent : thisItem.heading_justify, ...sx}}
                                headingVariant={thisItem.heading_size}
                                sx={{...sx, backgroundColor : 'transparent'}}
                            />
                        </Box>
                    </Grid>
                );
            }
            break;
        }

        case 'faqGroup': {
            const thisItem = section?.faqGroup;
            if (!_.isEmpty(thisItem)) {
                return (
                    <Grid className="theme" xs={12}>
                        <FaqGroup items={[thisItem]} sx={{width : '100%'}}/>
                    </Grid>
                );
            }
            break;
        }

        case 'opoFullWidthImageBanner': {
            const thisItem = section.fullWidthImageBanner;
            if (!_.isEmpty(thisItem)) {
                return (
                    <Grid
                        key={guid()}
                        container
                        width={'100vw'}
                        my={2}
                        height={thisItem?.image?.details?.image?.height || ''}
                        sx={{
                            backgroundImage : {
                                xs : `url(${thisItem?.mobileImage?.url})`,
                                sm : `url(${thisItem?.image?.url})`
                            },
                            backgroundSize  : 'cover',
                            cursor          : 'pointer',
                            ...sx
                        }}
                        onClick={() => jumpTo(thisItem?.linkUrl)}
                    >
                    </Grid>
                );
            }
            break;
        }

        case 'opoLinkTile': {
            const thisItem = section.linkTile;
            if (!_.isEmpty(thisItem)) {
                const title           = thisItem.title || '';
                // const displayContent  = thisItem.displayContent;
                const displayTitle    = thisItem.displayTitle;
                const linkUrl         = thisItem.linkUrl;
                const textColor       = thisItem.textColor;
                const backgroundColor = thisItem.backgroundColor;
                const content         = documentToReactComponents(thisItem.content);
                const fontFamily      = getFontFamily(thisItem.fontFamily);
                return (
                    <Paper
                        key={guid()}
                        sx={{
                            width           : {xs : '100%'},
                            minHeight       : {sm : '336px', xs : '200px'},
                            backgroundColor : backgroundColor || paletteColors.white,
                            color           : textColor || paletteColors.black,
                            margin          : '8px',
                            fontSize        : {xs : '34px', sm : '64px'},
                            display         : 'flex',
                            alignItems      : 'center',
                            justifyContent  : 'center',
                            fontFamily      : fontFamily,
                            ...sx
                        }}
                        onClick={() => jumpTo(linkUrl)}
                    >
                        {displayTitle ? title : content}
                    </Paper>
                );
            }
            break;
        }

        case 'videoGroup': {
            const thisItem = section?.videoGroup;
            if (!_.isEmpty(thisItem)) {
                return (
                    <Grid
                        className="theme"
                        width={'100%'}
                        //sx={smAndUp ? {} : { maxWidth: "92vw" }}
                        xs={12}
                        mt={interSectionGap}
                        key={`sec-${guid()}`}
                    >
                        <VideoGroup
                            onSelectItem={changeVGSelectedItem}
                            selectedItem={vgSelectedItem}
                            videoGroup={thisItem}
                        />
                    </Grid>
                );
            }
            break;
        }

        case 'videoCard': {
            const thisItem: IVideoCard = section.videoCard;
            if (!_.isEmpty(thisItem)) {
                return (
                    <Grid
                        display="flex"
                        className="theme"
                        width={'100%'}
                        //sx={{ maxWidth: { xs: "92vw", sm: "100%" } }}
                        xs={12}
                        mt={interSectionGap}
                    >
                        <VideoCard video={thisItem}/>;
                    </Grid>
                );
            }
            break;
        }

        case 'navBar': {
            const thisItem: INavBar = section.navBar;
            if (!_.isEmpty(thisItem)) {
                return (
                    <Grid maxWidth={{xs : '92vw', sm : 'lg'}} key={guid()} mt={interSectionGap} xs={12}>
                        <IconMenu
                            keyId={'franchisingIconMenu'}
                            focussedItem={iconMenuFocus}
                            navSx={{justifyContent : {sm : 'center', xs : ''}}}
                            headingSx={{
                                fontSize   : '14px !important',
                                lineHeight : '14px !important',
                                textAlign  : 'center !important'
                            }}
                            onSelect={focusIconMenu}
                            tileItems={(thisItem?.navItems || []).slice()}
                        />
                    </Grid>
                );
            }
            break;
        }

        case 'navContentGroup': {
            const thisItem: INavContentGroup = section.navContentGroup;
            if (!_.isEmpty(thisItem)) {
                return (
                    <>
                        {(thisItem?.navContentItems || [])
                            .filter((nci) => !_.isEmpty(nci) && (nci.linkId === iconMenuFocus))
                            .map((nci, ii) => {
                                return (nci.content || []).map((content: any, idx: number) => (
                                    <DrawSection section={{...content}} key={`nci-${ii}-content-${idx}`}/>
                                ));
                            })
                        }
                    </>
                );
            }
            break;
        }

        case 'twoColumnWithImage': {
            const thisItem: IContentfulTwoColumnWithImage = section.twoColumnWithImage;
            if (!_.isEmpty(thisItem)) {
                return (
                    <Grid className="theme twoColumnWithImage" width={'100%'} xs={12} mt={interSectionGap}>
                        <TwoColumn
                            content={{
                                heading : thisItem?.title || '',
                                content : thisItem?.content,
                                image   : thisItem?.image?.file?.url
                            }}
                            drawTitle={thisItem?.drawTitle}
                            imageLeft={!thisItem?.imageOnRight}
                            imageHeight={thisItem?.imageHeight}
                            verticalAlignContent={thisItem?.verticalAlignContent}
                            sx={sx}
                            headerSx={sx}
                        />
                    </Grid>
                );
            }
            break;
        }

        default: {
            console.log('Unknown content type: ', section);
            return (
                <Grid className="theme" xs={12}>
                    {section?.contentTypeId || ''}
                </Grid>
            );
        }
    }
    return <></>;
}
