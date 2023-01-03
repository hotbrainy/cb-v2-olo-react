import _                    from 'lodash';
import {createAsyncThunk}   from '@reduxjs/toolkit';
import {createSlice}        from '@reduxjs/toolkit';
import axios                from 'axios';
import {AxiosRequestConfig} from 'axios';
import {getFileUrl}         from '../../utils/contentful';

const proxyConfig: AxiosRequestConfig = {
    headers : {
        'Content-Type' : 'application/json',
        'Accept'       : 'application/json'
    }
};

const proxy = axios.create(proxyConfig);

export const apiGetPrivacyPolicyPageContent = createAsyncThunk(
    'privacy-policy/fetchPageContent',
    async ({config}: any): Promise<any> => {
        // Fetch items from Contentful
        const contentTypeId = 'privacyPolicyPage';
        const response      = await proxy.post(
            `${config.app.URL}/contentful`,
            {content_type : contentTypeId}
        );
        const entryItems    = response.data;

        if (_.isEmpty(entryItems) || (entryItems.total < 1)) {
            throw new Error(`Missing Contentful Content: ${contentTypeId}`);
        }

        // NOTE: there should only be one entry, so take the first
        const entry: any = _.first(entryItems.items);
        const fields     = (entry!.fields as any);

        // Transform the Contentful payload
        return {
            bannerImageUrl        : getFileUrl(fields.bannerImage, ''),
            bannerBackgroundColor : fields.bannerBackgroundColor || '#000000',
            title                 : fields.title || '',
            body                  : fields.body
        };
    }
);

interface IPrivacyPolicyState
{
    contentful: any;
    loading: boolean;
    error: Error | string | null;
}

export const initialState: IPrivacyPolicyState = {
    contentful : {},
    loading    : false,
    error      : ((null as unknown) as string)
};

export const privacyPolicySlice = createSlice({
    name          : 'privacy-policy',
    initialState,
    extraReducers : (builder) => {
        /*
         * apiGetPrivacyPolicyPageContent Cases
         */
        builder.addCase(apiGetPrivacyPolicyPageContent.pending, (state, action) => {
            state.error   = null;
            state.loading = true;
        });

        builder.addCase(apiGetPrivacyPolicyPageContent.rejected, (state, action) => {
            state.error   = action.error.message || null;
            state.loading = false;
        });

        builder.addCase(apiGetPrivacyPolicyPageContent.fulfilled, (state, action) => {
            state.error      = null;
            state.contentful = {...action.payload};
            state.loading    = false;
        });
    },

    reducers : {}
});

const {actions, reducer} = privacyPolicySlice;
export default reducer;


/**
 * ADDITIONAL SELECTORS
 */
