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

export const apiGetTermsConditionsPageContent = createAsyncThunk(
    'terms-conditions/fetchPageContent',
    async ({config}: any): Promise<any> => {
        // Fetch items from Contentful
        const contentTypeId = 'termsConditionsPage';
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

interface ITermsConditionsState
{
    contentful: any;
    loading: boolean;
    error: Error | string | null;
}

export const initialState: ITermsConditionsState = {
    contentful : {},
    loading    : false,
    error      : ((null as unknown) as string)
};

export const termsConditionsSlice = createSlice({
    name          : 'terms-conditions',
    initialState,
    extraReducers : (builder) => {
        /*
         * apiGetTermsConditionsPageContent Cases
         */
        builder.addCase(apiGetTermsConditionsPageContent.pending, (state, action) => {
            state.error   = null;
            state.loading = true;
        });

        builder.addCase(apiGetTermsConditionsPageContent.rejected, (state, action) => {
            state.error   = action.error.message || null;
            state.loading = false;
        });

        builder.addCase(apiGetTermsConditionsPageContent.fulfilled, (state, action) => {
            state.error      = null;
            state.contentful = {...action.payload};
            state.loading    = false;
        });
    },

    reducers : {}
});

const {actions, reducer} = termsConditionsSlice;
export default reducer;


/**
 * ADDITIONAL SELECTORS
 */
