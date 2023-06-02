import _                           from 'lodash';
import React                       from 'react';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Hidden}                    from '@mui/material';
import {Paper}                     from '@mui/material';
import Grid                        from '@mui/system/Unstable_Grid';
import {rootStyles}                from 'src/shared/styles';
import paletteColors               from 'src/theme/paletteColors';
import {guid}                      from 'src/utils/utils';
import {getFontFamily}             from 'src/views/content/drawSection';
import {jumpTo}                    from 'src/views/content/drawSection';
import {Swiper}                    from 'swiper/react';
import {SwiperSlide}               from 'swiper/react';
import {Navigation}                from 'swiper';
import {Pagination}                from 'swiper';
// import {settings}                  from 'src/shared/config-settings';

export interface IContentfulLinkTileGroup
{
    name: string;
    linkTiles: IContentfulLinkTile[];
}

export interface IContentfulLinkTile
{
    backgroundColor: string;
    textColor: string;
    displayContent: boolean;
    displayTitle: boolean;
    linkUrl: string;
    title: string;
    content: any;
    fontFamily: string;
    heightDesktop?: number;
    heightMobile?: number;
}

export function extractLinkTileGroupFromContentful(fields: any): IContentfulLinkTileGroup | null {
    return _.isEmpty(fields) ? null : {
        name      : fields.name || '',
        linkTiles : (fields.linkTiles || [])
            .map((p: any) => extractLinkTileFromContentful(p?.fields))
            .filter((p: any) => !_.isEmpty(p))
    };
}

export function extractLinkTileFromContentful(fields: any): IContentfulLinkTile | null {
    return _.isEmpty(fields) ? null : {
        content         : fields.content,
        backgroundColor : fields.backgroundColor,
        textColor       : fields.textColor,
        displayContent  : fields.displayContent,
        displayTitle    : fields.displayTitle,
        linkUrl         : fields.linkUrl,
        title           : fields.title,
        fontFamily      : fields.fontFamily,
        heightDesktop   : fields.width || 192,
        heightMobile    : fields.width || 192
    };
}

export function DrawLinkTileGroup(props: { linkTileGroup: IContentfulLinkTileGroup }): React.ReactElement {
    const {linkTileGroup} = props;

    const thisItem      = linkTileGroup;
    const numberOfTiles = thisItem?.linkTiles?.length;
    const gridWidth     = numberOfTiles ? Math.round(12 / numberOfTiles) : 12;
    const maxGridWidth  = 4; // 3 tiles wide

    return (
        <Grid
            key={guid()}
            container
            className="theme"
            width="100%"
            justifyContent={'center'}
            sx={{...rootStyles.swiper, cursor : 'pointer'}}
            spacing={2}
        >
            <Hidden smDown>
                {(thisItem?.linkTiles || []).map((thisTile: any) => (
                    <Grid xs={12} sm={Math.max(gridWidth, maxGridWidth)} key={guid()}>
                        <DrawLinkTile linkTile={thisTile}/>
                    </Grid>
                ))}
            </Hidden>
            <Hidden smUp>
                <Swiper
                    key={guid()}
                    direction={'horizontal'}
                    pagination={false}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    slidesPerView={1}
                >
                    {thisItem.linkTiles.map((thisTile: any, iidx: number) => {
                        return (
                            <SwiperSlide key={`tile-${iidx}`}>
                                <Grid xs={12} sx={{width : {xs : '250px', sm : 'inherit'}}}>
                                    <DrawLinkTile linkTile={{...thisTile, heightMobile : 130}}/>
                                </Grid>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </Hidden>
        </Grid>
    );
}

export function DrawLinkTile(props: { linkTile: IContentfulLinkTile }): React.ReactElement {
    const thisItem = props.linkTile;

    const title           = thisItem?.title || '';
    // const displayContent  = thisItem?.displayContent || false;
    const displayTitle    = thisItem?.displayTitle || false;
    const linkUrl         = thisItem?.linkUrl || '';
    const textColor       = thisItem?.textColor || '';
    const backgroundColor = thisItem?.backgroundColor || '';
    const content         = documentToReactComponents(thisItem?.content);
    const fontFamily      = getFontFamily(thisItem?.fontFamily);
    const heightDesktop   = thisItem?.heightDesktop;
    const heightMobile    = thisItem?.heightMobile;

    return (
        <Paper
            key={guid()}
            onClick={() => jumpTo(linkUrl)}
            sx={{
                minHeight       : {sm : heightDesktop || '192px', xs : heightMobile || '192px'},
                backgroundColor : backgroundColor || paletteColors.white,
                color           : textColor || paletteColors.black,
                borderRadius    : '12px',
                margin          : '8px',
                fontSize        : {xs : '34px', sm : '64px'},
                lineHeight      : {xs : '36px', sm : '66px'},
                padding         : {xs : '10px', sm : '24px'},
                display         : 'flex',
                alignItems      : 'center',
                justifyContent  : 'center',
                fontFamily      : fontFamily
            }}
        >
            {displayTitle ? title : content}
        </Paper>
    );
}
