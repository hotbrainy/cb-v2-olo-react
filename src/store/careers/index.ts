import _                      from 'lodash';
import {createAsyncThunk}     from '@reduxjs/toolkit';
import {createSlice}          from '@reduxjs/toolkit';
import axios                  from 'axios';
import {AxiosRequestConfig}   from 'axios';
import {getFileUrl}           from '../../utils/contentful';
import {transformFaqGroup}    from '../../utils/contentful';
import {transformArticle}     from '../../utils/contentful';
import {transformArticleList} from '../../utils/contentful';

const proxyConfig: AxiosRequestConfig = {
    headers : {
        'Content-Type' : 'application/json',
        'Accept'       : 'application/json'
    }
};

const proxy = axios.create(proxyConfig);

export const apiGetCareersPageContent = createAsyncThunk(
    'careers/fetchPageContent',
    async ({config}: any): Promise<any> => {
        // Fetch items from Contentful
        const contentTypeId = 'careersPage';
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

        const faqs = transformFaqGroup(fields.faqs, 0);
        faqs.title += ' FAQs';

        // Transform the Contentful payload
        return {
            bannerImageUrl        : getFileUrl(fields.bannerImage, ''),
            bannerBackgroundColor : fields.bannerBackgroundColor || '#000000',
            title                 : fields.title || '',
            applyNowUrl           : fields.applyNowUrl || '',
            whyWorkHere           : transformArticle(fields.whyWorkHere),
            applicationProcess    : transformArticleList(fields.applicationProcess),
            perks                 : transformArticleList(fields.perks),
            faqs                  : [faqs] // NOTE: array of faqGroups expected
        };
    }
);

interface ICareersState
{
    contentful: any;
    loading: boolean;
    error: Error | string | null;
}

export const initialState: ICareersState = {
    contentful : {},
    loading    : false,
    error      : ((null as unknown) as string)
};

export const careersSlice = createSlice({
    name          : 'careers',
    initialState,
    extraReducers : (builder) => {
        /*
         * apiGetCareersPageContent Cases
         */
        builder.addCase(apiGetCareersPageContent.pending, (state, action) => {
            state.error   = null;
            state.loading = true;
        });

        builder.addCase(apiGetCareersPageContent.rejected, (state, action) => {
            state.error   = action.error.message || null;
            state.loading = false;
        });

        builder.addCase(apiGetCareersPageContent.fulfilled, (state, action) => {
            state.error      = null;
            state.contentful = {...action.payload};
            state.loading    = false;
        });
    },

    reducers : {}
});

const {actions, reducer} = careersSlice;
export default reducer;


/**
 * ADDITIONAL SELECTORS
 */
