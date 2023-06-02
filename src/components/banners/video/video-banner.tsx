import _                  from 'lodash';
import React              from 'react';
import {IContentfulMedia} from 'src/store/pages/pages';

export interface IVideoBanner
{
    name: string;
    video?: IContentfulMedia | null;
    backgroundImage?: IContentfulMedia | null;
    autoplay: boolean;
    fullWidth: boolean;
}

export function extractVideoBannerFromContentful(fields: any): IVideoBanner | null {
    return _.isEmpty(fields) ? null : {
        name            : fields.name || '',
        autoplay        : _.get(fields, 'autoplay', true) || false,
        fullWidth       : _.get(fields, 'fullWidth', false),
        video           : _.isEmpty(fields.video?.fields) ? null : {
            title       : fields.video.fields.title || '',
            description : fields.video.fields.description || '',
            file        : fields.video.fields.file || null
        },
        backgroundImage : _.isEmpty(fields.backgroundImage?.fields) ? null : {
            title       : fields.backgroundImage.fields.title || '',
            description : fields.backgroundImage.fields.description || '',
            file        : fields.backgroundImage.fields.file || null
        }
    };
}
