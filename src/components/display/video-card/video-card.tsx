import _         from 'lodash';
import React     from 'react';
import {Theme}   from '@mui/material/styles';
import {SxProps} from '@mui/system';

import VideoGroup from '../video-group/video-group';

import {IContentfulMedia} from 'src/store/pages/pages';


export interface IVideoCard
{
    title: string;
    content: any;
    linkedIn?: string | null;
    imageLeft: boolean;
    avatar?: IContentfulMedia | null;
    image?: IContentfulMedia | null;
    video?: IContentfulMedia | null;
}

interface IVideoCardProps
{
    video: IVideoCard;
    navItems?: React.ReactElement;
    sx?: SxProps<Theme>;
}

export function extractVideoCardFromContentful(fields: any): IVideoCard | null {
    return _.isEmpty(fields) ? null : {
        title     : fields.title || '',
        content   : fields.content,
        linkedIn  : fields.linkedIn || '',
        imageLeft : fields.imageLeft || false,
        image     : _.isEmpty(fields.image?.fields) ? null : {
            title       : fields.image.fields.title || '',
            description : fields.image.fields.description || '',
            file        : fields.image.fields.file || null
        },
        video     : _.isEmpty(fields.video?.fields) ? null : {
            title       : fields.video.fields.title || '',
            description : fields.video.fields.description || '',
            file        : fields.video.fields.file || null
        },
        avatar    : _.isEmpty(fields.avatar?.fields) ? null : {
            title       : fields.avatar.fields.title || '',
            description : fields.avatar.fields.description || '',
            file        : fields.avatar.fields.file || null
        }
    };
}

export default function DrawVideoCard(props: IVideoCardProps): React.ReactElement {
    const {video/*, sx*/} = props;

    return (
        <VideoGroup
            videoGroup={{
                identifier  : video?.title || '',
                defaultItem : 0,
                title       : video?.title || '',
                videos      : [video]
            }}
        />
    );
}

