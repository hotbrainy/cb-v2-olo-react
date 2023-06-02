import _                                         from 'lodash';
import {createAsyncThunk}                        from '@reduxjs/toolkit';
import {createSlice}                             from '@reduxjs/toolkit';
import axios                                     from 'axios';
import {AxiosRequestConfig}                      from 'axios';
import {IContentfulPage}                         from 'src/utils/contentful';
import {transformFaqGroupItem}                   from 'src/utils/contentful';
import {VMNavTile}                               from 'src/components/menus/nav-swiper/nav-swiper';
import {extractVideoCardFromContentful}          from 'src/components/display/video-card/video-card';
import {extractVideoGroupFromContentful}         from 'src/components/display/video-group/video-group';
import {IHeadingTitleProps}                      from 'src/views/menu/components/header';
import {extractLinkTileFromContentful}           from 'src/components/display/link-tile-group/link-tile-group';
import {extractLinkTileGroupFromContentful}      from 'src/components/display/link-tile-group/link-tile-group';
import {extractAdventureTileFromContentful}      from 'src/components/display/adventure-tile-group/adventure-tile-group';
import {extractAdventureTileGroupFromContentful} from 'src/components/display/adventure-tile-group/adventure-tile-group';
import {extractFullWidthBannerFromContentful}    from 'src/components/display/full-width-image-banner/full-width-image-banner';
import {extractWhatsNewTileGroupFromContentful}  from 'src/components/display/whats-new-tile-group/whats-new-tile-group';
import {extractCallToActionFromContentful}       from 'src/components/display/call-to-action/call-to-action';
import {extractCallToActionGroupFromContentful}  from 'src/components/display/call-to-action/call-to-action';
import {extractTierPanelFromContentful}          from 'src/components/display/reward-tier-panel/reward-tier-panel';
import {extractTierTileFromContentful}           from 'src/components/display/reward-tier-panel/reward-tier-panel';
import {extractColouredBlockFromContentful}      from 'src/components/display/coloured-block/coloured-block';
import {extractCarouselFromContentful}           from 'src/components/display/carousel/carousel';
import {extractVideoBannerFromContentful}        from 'src/components/banners/video/video-banner';
import {IVideoCard}                              from 'src/components/display/video-card/video-card';
import {extractRoleGroupFromContentful}          from 'src/components/display/role-tile-group/role-tile-group';
import {extractRoleTileFromContentful}           from 'src/components/display/role-tile-group/role-tile-group';

const proxyBaseUrl = '/contentful-proxy';

const proxyConfig: AxiosRequestConfig = {
    headers : {
        'Content-Type' : 'application/json',
        Accept         : 'application/json'
    }
};

const proxy = axios.create(proxyConfig);

export const apiGetPage = createAsyncThunk(
    'oportoPage/fetchPageContent',
    async ({config}: any): Promise<any> => {
        // Fetch items from Contentful
        const content_type = 'oportoPage';
        const response     = await proxy.post(`${config.app.URL}${proxyBaseUrl}`, {content_type});
        const entryItems   = response.data;
        if ((entryItems?.total || 0) < 1) {
            throw new Error(`Missing Contentful Content: ${content_type}`);
        }

        // Transform the Contentful payload
        return entryItems.items
            .map((item: any) => (_.isEmpty(item?.fields) || _.isEmpty(item?.sys)) ? null : {
                contentTypeId : item.sys.contentType.sys.id,
                ...item.fields,
                // pageReference       : item.fields.pageReference,
                // bannerImage         : item.fields.bannerImage,
                // bannerHeightDesktop : item.fields.bannerHeightDesktop,
                // bannerMobile        : item.fields.bannerMobile,
                // bannerHeightMobile  : item.fields.bannerHeightMobile,
                // bannerTitle         : item.fields.bannerTitle,
                // pageTitle           : item.fields.pageTitle,
                // includeButtons      : item.fields.includeButtons || false,
                // useBanner           : item.fields.useBanner || true,
                sections : (item.fields.sections || [])
                    .map((sec: any) => (_.isEmpty(sec?.fields) || _.isEmpty(sec?.sys))
                        ? null
                        : getSection(sec.sys.contentType.sys.id, sec)
                    )
                    .filter((p: any) => !_.isEmpty(p))
                // ,
                // ...item
            })
            .filter((p: any) => !_.isEmpty(p))
            ;
    }
);

export function getSection(contentTypeId: string, sec: any): any {
    try {
        switch (contentTypeId) {
            // TODO: ###################################################################################################
            // TODO: need to replace these oporto specific types with something generic that can be used across projects
            // TODO: ###################################################################################################
            case 'opoPerksGroup':
                return {contentTypeId, [contentTypeId] : extractPerksGroupFromContentful(sec?.fields)};
            case 'opoPerksTile':
                return {contentTypeId, [contentTypeId] : extractPerksTileFromContentful(sec?.fields)};
            case 'opoRewardTierPanel':
                return {contentTypeId, [contentTypeId] : extractTierPanelFromContentful(sec?.fields)};
            case 'opoRewardTierTile':
                return {contentTypeId, [contentTypeId] : extractTierTileFromContentful(sec?.fields)};
            case 'oportoFancyTitle':
                return {contentTypeId, [contentTypeId] : extractFancyTitleFromContentful(sec?.fields)};
            case 'oportoTitle':
                return {contentTypeId, [contentTypeId] : extractTitleFromContentful(sec?.fields)};
            // TODO: ##########################################################################################################

            case 'carouselGroup':
                return {contentTypeId, carouselGroup : extractCarouselFromContentful(sec?.fields)};
            // case 'carouselItem':
            //     return {contentTypeId, carouselItem: extractCarouselItemFromContentful(sec?.fields) };
            case 'colouredBlock':
                return {contentTypeId, colouredBlock : extractColouredBlockFromContentful(sec?.fields)};
            case 'whatsNewTileGroup':
                return {contentTypeId, whatsNewTileGroup : extractWhatsNewTileGroupFromContentful(sec?.fields)};
            case 'linkTileGroup':
                return {contentTypeId, linkTileGroup : extractLinkTileGroupFromContentful(sec?.fields)};
            case 'linkTile':
                return {contentTypeId, linkTile : extractLinkTileFromContentful(sec?.fields)};
            case 'roleGroup':
                return {contentTypeId, roleGroup : extractRoleGroupFromContentful(sec?.fields)};
            case 'roleTile':
                return {contentTypeId, roleTile : extractRoleTileFromContentful(sec?.fields)};
            case 'ctFullWidthImageBanner':
            case 'fullWidthImageBanner':
                return {contentTypeId, fullWidthImageBanner : extractFullWidthBannerFromContentful(sec?.fields)};
            case 'opoAdventureTileGroup':
            case 'adventureTileGroup':
                return {contentTypeId, [contentTypeId] : extractAdventureTileGroupFromContentful(sec?.fields)};
            case 'opoAdventureTile':
            case 'adventureTile':
                return {contentTypeId, [contentTypeId] : extractAdventureTileFromContentful(sec?.fields)};
            case 'twoColumnWithImage':
                return {contentTypeId, [contentTypeId] : extractTwoColumnWithImageFromContentful(sec?.fields)};
            case 'videoBanner':
                return {contentTypeId, [contentTypeId] : extractVideoBannerFromContentful(sec?.fields)};
            case 'videoGroup':
                return {contentTypeId, [contentTypeId] : extractVideoGroupFromContentful(sec?.fields)};
            case 'videoCard':
                return {contentTypeId, [contentTypeId] : extractVideoCardFromContentful(sec?.fields)};
            case 'linkGroup':
                return {contentTypeId, [contentTypeId] : extractLinkGroupFromContentful(sec?.fields)};
            case 'paragraph':
                return {contentTypeId, [contentTypeId] : extractParagraphFromContentful(sec?.fields)};
            case 'navContentGroup':
                return {contentTypeId, [contentTypeId] : extractNavContentGroupFromContentful(sec?.fields)};
            case 'navContentItem':
                return {contentTypeId, [contentTypeId] : extractNavContentItemFromContentful(sec)};
            case 'faqGroup':
                return {contentTypeId, [contentTypeId] : extractFaqGroupFromContentful(sec?.fields)};
            case 'navBar':
                return {contentTypeId, [contentTypeId] : extractNavBarFromContentful(sec?.fields)};
            case 'callToActionGroup':
                return {contentTypeId, [contentTypeId] : extractCallToActionGroupFromContentful(sec?.fields)};
            case 'callToAction':
                return {contentTypeId, [contentTypeId] : extractCallToActionFromContentful(sec?.fields)};
            default:
                return {contentTypeId, ...(sec || {})};
        }
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

interface IPageState
{
    loading: boolean;
    error: Error | string | null;
    contentful: Record<string, IContentfulPage> | null;
}

export const initialState: IPageState = {
    contentful : null,
    loading    : false,
    error      : (null as unknown) as string
};

export const pageSlice   = createSlice({
    name          : 'pages',
    initialState,
    extraReducers : (builder) => {
        /*
         * apiGetPage Cases
         */
        builder.addCase(apiGetPage.pending, (state, action) => {
            state.error   = null;
            state.loading = true;
        });

        builder.addCase(apiGetPage.rejected, (state, action) => {
            state.error   = action.error.message || null;
            state.loading = false;
        });

        builder.addCase(apiGetPage.fulfilled, (state, action) => {
            state.error      = null;
            state.contentful = {...action.payload};
            state.loading    = false;
        });
    },

    reducers : {}
});
const {actions, reducer} = pageSlice;

export interface ILinkBlock
{
    identifier: string;
    heading: string;
    backgroundImage?: {
        title: string;
        description: string;
        file: IMediaElement;
    } | null;
    linkToUrl: string;
}

export interface ILinkGroup
{
    identifier: string;
    height: string;
    width: string;
    justifyContent: string;
    elevation: number;
    linkBlocks: ILinkBlock[];
}

export interface IParagraph
{
    heading: string;
    showHeading?: boolean;
    heading_justify: string;
    heading_size: string;
    content: any;
    content_justify: string;
    width: string;
}

export interface INavBar
{
    title: string;
    navItems: VMNavTile[];
    rawItems?: any;
    showpagination: boolean;
    defaultItemLinkId: number;
}

export interface INavContentGroup
{
    title: string;
    navContentItems: any[];
}

export interface IOportoTitleItem
{
    title: string;
    adornment?: IContentfulMedia | null;
    marginTop?: number;
}

export interface INavContentItem
{
    type: string;
    linkId: number;
    title: string;
    content: IContentfulContentItem[];
}

export interface IContentfulContentItem
{
    type: string;
    title: string;
    fields: any;
}

export interface IContentfulTwoColumnWithImage
{
    title: string;
    drawTitle: boolean;
    imageOnRight: boolean;
    imageHeight?: number;
    content: any;
    verticalAlignContent: string;
    image?: IContentfulMedia | null;
}

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
}

export interface IContentfulSnippyTileGroup
{
    name: string;
    snippyTiles: IContentfulSnippyTile[];
}

export interface IContentfulSnippyTile
{
    name: string;
    line1: string;
    line2: string;
    line3: string;
    line1Sx: string;
    line2Sx: string;
    line3Sx: string;
}

export interface IContentfulPerksGroup
{
    name: string;
    justification: string;
    perksTiles: IContentfulPerksTile[];
}

export interface IContentfulPerksTile
{
    name: string;
    heading: string;
    subtext: string;
    badge?: IContentfulMedia | null;
}

export interface IContentfulTierPanel
{
    title: string;
    justification: string;
    rewardTiles: IContentfulTierTile[];
}

export interface IContentfulTierTile
{
    title: string;
    description: any;
    headerIcon?: IContentfulMedia | null;
    benefit1?: IContentfulTierBenefit | null;
    benefit2?: IContentfulTierBenefit | null;
    benefit3?: IContentfulTierBenefit | null;
}

export interface IContentfulTierBenefit
{
    title: string;
    description: string;
    badge?: IContentfulMedia | null;
}

export interface IContentfulMedia
{
    title: string;
    description: string;
    file?: IMediaElement | null;
}

export interface IMediaElement
{
    contentType: string;
    details: {
        image: {
            height: number;
            width: number;
        };
        size: number;
    };
    fileName: string;
    url: string;
}

export function extractFaqGroupFromContentful(fields: any): any {
    return _.isEmpty(fields) ? null : {
        title : fields.title || '',
        items : (fields.items || [])
            .map((p: any) => transformFaqGroupItem(p, 0))
            .filter((p: any) => !_.isEmpty(p))
    };
}

export function extractFileFromContentful(fields: any): IMediaElement | null {
    return _.isEmpty(fields) ? null : {
        url         : fields.url || '',
        fileName    : fields.fileName || '',
        contentType : fields.contentType || '',
        details     : fields.details
    };
}

export function extractMediaFromContentfulMedia(model: any): IContentfulMedia | null {
    return _.isEmpty(model?.fields) ? null : ({
        title       : model?.fields.title || '',
        description : model?.fields.description || '',
        file        : extractFileFromContentful(model?.fields.file)
    }) as IContentfulMedia;
}

export function extractTwoColumnWithImageFromContentful(fields: any): IContentfulTwoColumnWithImage | null {
    return _.isEmpty(fields) ? null : {
        title                : fields.title || '',
        drawTitle            : fields.drawTitle || false,
        imageOnRight         : fields.imageOnRight || false,
        imageHeight          : fields.imageHeight,
        content              : fields.content,
        verticalAlignContent : fields.verticalAlignContent || '',
        image                : extractMediaFromContentfulMedia(fields.image)
    };
}

export function extractPerksGroupFromContentful(fields: any): IContentfulPerksGroup | null {
    return _.isEmpty(fields) ? null : {
        name          : fields.name || '',
        justification : fields.justification || '',
        perksTiles    : (fields.perksTiles || [])
            .map((rt: any) => extractPerksTileFromContentful(rt?.fields))
            .filter((p: any) => !_.isEmpty(p))
    };
}

export function extractPerksTileFromContentful(fields: any): IContentfulPerksTile | null {
    return _.isEmpty(fields) ? null : {
        name    : fields.name || '',
        heading : fields.heading || '',
        subtext : fields.subtext || '',
        badge   : extractMediaFromContentfulMedia(fields.badge)
    };
}

export function extractContentFromContentful(content: any): any {
    try {
        if (_.isEmpty(content)) {
            return null;
        }

        const type = content.contentTypeId;
        return getSection(type, content);
    }
    catch (err) {
        console.error(err);
        return null;
    }
}

export function extractFancyTitleFromContentful(fields: any): IHeadingTitleProps | null {
    return _.isEmpty(fields) ? null : {
        title  : fields.title,
        isBold : fields.isBold
    };
}

export function extractTitleFromContentful(fields: any): IOportoTitleItem | null {
    return _.isEmpty(fields) ? null : {
        title     : fields.title || '',
        marginTop : fields.marginTop,
        adornment : extractMediaFromContentfulMedia(fields.adornment)
    };
}

export function extractNavContentItemFromContentful(fields: any): INavContentItem | null {
    return _.isEmpty(fields?.sys?.contentType?.sys?.id) ? null : {
        type    : fields.sys.contentType.sys.id,
        title   : fields.fields?.title || '',
        linkId  : fields.fields?.linkId || 0,
        content : (fields.fields?.content || [])
            .filter((p: any) => !_.isEmpty(p))
            .map((p: any) => extractContentFromContentful({...p, contentTypeId : p.sys.contentType.sys.id}))
    };
}

export function extractNavContentGroupFromContentful(fields: any): INavContentGroup | null {
    return _.isEmpty(fields) ? null : {
        title           : fields.title || '',
        navContentItems : fields.navContentItems
            .map(extractNavContentItemFromContentful)
            .filter((p: any) => !_.isEmpty(p))
    };
}

export function extractNavBarFromContentful(fields: any): INavBar | null {
    return _.isEmpty(fields) ? null : {
        title             : fields.title || '',
        showpagination    : fields.showPagination || '',
        defaultItemLinkId : fields.defaultItemLinkId || 0,
        navItems          : (fields.navItems || [])
            .map((nav: any) => _.isEmpty(nav?.fields) ? null : {
                id      : nav.fields.linkId || '',
                heading : nav.fields.title || '',
                image   : nav.fields.avatar?.fields?.file?.url || null,
                content : nav.fields.description || '',
                url     : nav.fields.linkUrl || ''
            })
            .filter((p: any) => !_.isEmpty(p))
        ,
        rawItems : fields.navItems
    };
}

export function extractParagraphFromContentful(fields: any): IParagraph | null {
    return _.isEmpty(fields) ? null : {
        heading         : fields.heading || '',
        showHeading     : fields.showHeading || false,
        heading_justify : fields.headingJustify || '',
        heading_size    : fields.headingSize || '',
        content_justify : fields.contentJustify || '',
        content         : fields.content,
        width           : fields.width || ''
    };
}

export function extractLinkGroupFromContentful(fields: any): ILinkGroup | null {
    return _.isEmpty(fields) ? null : {
        identifier     : fields.identifier || '',
        height         : fields.height || '',
        width          : fields.width || '',
        justifyContent : fields.justifyContent || '',
        elevation      : fields.elevation || 0,
        linkBlocks     : (fields.linkBlocks || [])
            .map((vid: any) => _.isEmpty(vid?.fields) ? null : ({
                identifier      : vid.fields.identifier || '',
                heading         : vid.fields.heading || '',
                linkToUrl       : vid.fields.linkToUrl || '',
                backgroundImage : _.isEmpty(vid.fields.backgroundImage?.fields) ? null : {
                    title       : vid.fields.backgroundImage.fields.title || '',
                    description : vid.fields.backgroundImage.fields.description || '',
                    file        : vid.fields.backgroundImage.fields.file || ''
                }
            }))
            .filter((p: any) => !_.isEmpty(p))
    };
}

export default reducer;
