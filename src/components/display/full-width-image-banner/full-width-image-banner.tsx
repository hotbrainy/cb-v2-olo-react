import _                           from 'lodash';
import React                       from 'react';
import Grid                        from '@mui/system/Unstable_Grid';
import {guid}                      from 'src/utils/utils';
import {extractFileFromContentful} from 'src/store/pages/pages';
import {IMediaElement}             from 'src/store/pages/pages';
import {jumpTo}                    from 'src/views/content/drawSection';
import {useMediaQuery}             from '@mui/material';
import theme                       from 'src/theme';

export interface IFullWidthBanner
{
    name            : string;
    linkUrl?        : string;
    image?          : IMediaElement | null;
    mobileImage?    : IMediaElement | null;
    topMargin       : number;
    bottomMargin    : number;
    fullScreenWidth : boolean;
}

export function extractFullWidthBannerFromContentful(fields: any): IFullWidthBanner | null {
    return _.isEmpty(fields) ? null : {
        name            : fields.name || '',
        linkUrl         : fields.linkUrl,
        mobileImage     : extractFileFromContentful(fields.mobileImage?.fields?.file),
        image           : extractFileFromContentful(fields.image?.fields?.file),
        topMargin       : fields.topMargin || 16,
        bottomMargin    : fields.bottomMargin || 16,
        fullScreenWidth : (fields?.fullScreenWidth === undefined) || fields?.fullScreenWidth
    };
}

export function DrawFullWidthImageBanner(props: { fullWidthImageBanner: IFullWidthBanner }): React.ReactElement {
    const thisItem                           = props.fullWidthImageBanner;
    const smAndUp                            = useMediaQuery(theme.breakpoints.up('sm'));
    const theImage                           = smAndUp
        ? thisItem?.image?.url
        : thisItem?.mobileImage?.url
    ;
    const {linkUrl, topMargin, bottomMargin} = thisItem;
    const fullScreenWidth                    = false;

    return (
        <Grid
            key={guid()}
            className="fullWidthImageBanner"
            container
            width={fullScreenWidth ? '100vw' : {xs : 'calc(100% - 32px)', sm : '1200px'}}
            sx={{cursor : _.isEmpty(linkUrl) ? 'default' : 'pointer'}}
            mx={'auto'}
            mt={`${topMargin}px`}
            mb={`${bottomMargin}px`}
            onClick={() => jumpTo(linkUrl)}
        >
            <img src={theImage} width="100%" alt={''}/>
        </Grid>
    );
}
