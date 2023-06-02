import {IMediaElement} from 'src/store/pages/pages';

export interface VMCarouselItem
{
    title?: string;
    backgroundImage?: IMediaElement | null;
    backgroundImageURL?: string;
    backgroundImageHeight?: number;
    content?: string;
}
