import _                    from 'lodash';
import {createAsyncThunk}   from '@reduxjs/toolkit';
import {createSlice}        from '@reduxjs/toolkit';
import axios                from 'axios';
import {AxiosRequestConfig} from 'axios';
import {IMediaElement}      from '../pages/pages';

const proxyBaseUrl = '/contentful-proxy';

const proxyConfig: AxiosRequestConfig = {
    headers : {
        'Content-Type' : 'application/json',
        Accept         : 'application/json'
    }
};

const proxy = axios.create(proxyConfig);

export const apiGetSettings = createAsyncThunk(
    'webSettings/fetchPageContent',
    async ({config}: any): Promise<any> => {
        // Fetch items from Contentful
        const content_type = 'webSettings';
        console.log('getting settings: ');
        const response   = await proxy.post(`${config.app.URL}${proxyBaseUrl}`, {content_type});
        const entryItems = response.data;
        console.log('settings: ', entryItems);
        if (_.isEmpty(entryItems) || entryItems.total < 1) {
            throw new Error(`Missing Contentful Content: ${content_type}`);
        }

        // Transform the Contentful payload
        return entryItems.items;
    }
);

interface ISettingsPage
{
    menuImage: IMediaElement,
    mobileMenuImage: IMediaElement,
}

interface ISettingsState
{
    loading: boolean;
    error: Error | string | null;
    settings: Record<string, ISettingsPage> | null;
}

export const initialState: ISettingsState = {
    settings : null,
    loading  : false,
    error    : (null as unknown) as string
};

export const settingsSlice = createSlice({
    name          : 'settings',
    initialState,
    extraReducers : (builder) => {
        /*
         * apiGetSettings Cases
         */
        builder.addCase(apiGetSettings.pending, (state, action) => {
            state.error   = null;
            state.loading = true;
        });

        builder.addCase(apiGetSettings.rejected, (state, action) => {
            state.error   = action.error.message || null;
            state.loading = false;
        });

        builder.addCase(apiGetSettings.fulfilled, (state, action) => {
            state.error    = null;
            state.settings = {...action.payload};
            state.loading  = false;
        });

    },
    reducers      : {}
});
const {actions, reducer}   = settingsSlice;

export default reducer;
