import {createSlice} from '@reduxjs/toolkit';
import navMenu       from './assets/nav-menu.json';

import facebookIcon  from '../../assets/images/figma/icons/facebook-negative.svg';
import instagramIcon from '../../assets/images/figma/icons/instagram-negative.svg';
import twitterIcon   from '../../assets/images/figma/icons/twitter-negative.svg';
import youtubeIcon   from '../../assets/images/figma/icons/youtube-negative.svg';

interface IAppState
{
    navMenu: ReadonlyArray<INavigationItem>;
    isMainMenuOpen: boolean;
    isStorePickerOpen: boolean;
    socialLinks: ReadonlyArray<INavigationItem>;
    contentful: any;
    loading: boolean;
    error: Error | string | null;
}

export const initialState: IAppState = {
    navMenu,
    isMainMenuOpen    : false, // NOTE: used for Mobile
    isStorePickerOpen : false,
    // TODO: fetch this from Contentful ???
    socialLinks : [
        {icon : facebookIcon, title : 'Facebook', href : 'https://www.facebook.com/ChickenTreat'},
        {icon : instagramIcon, title : 'Instagram', href : 'https://www.instagram.com/chickentreat_au'},
        {icon : twitterIcon, title : 'Twitter', href : 'https://twitter.com/ChickenTreat'},
        {icon : youtubeIcon, title : 'YouTube', href : 'https://www.youtube.com/channel/UCxekGKrKme0NH_hOCv358_g'}
    ],
    contentful  : {},
    loading     : false,
    error       : ((null as unknown) as string)
};

export const appSlice = createSlice({
    name     : 'app',
    initialState,
    reducers : {
        setMainMenuOpen : (state, action) => {
            if (action.type === 'app/setMainMenuOpen') {
                state.isMainMenuOpen = action.payload;
            }
        },

        setStorePickerOpen : (state, action) => {
            if (action.type === 'app/setStorePickerOpen') {
                state.isStorePickerOpen = action.payload;
            }
        }
    }
});

const {actions, reducer} = appSlice;
export default reducer;

/**
 * ACTIONS
 */
export const {setMainMenuOpen}    = actions;
export const {setStorePickerOpen} = actions;


/**
 * ADDITIONAL SELECTORS
 */
