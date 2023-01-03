import _                    from 'lodash';
import {createAsyncThunk}   from '@reduxjs/toolkit';
import {createSlice}        from '@reduxjs/toolkit';
import axios                from 'axios';
import {AxiosRequestConfig} from 'axios';
import {getFileUrl}         from '../../utils/contentful';
import {transformFaqGroup}  from '../../utils/contentful';

const proxyConfig: AxiosRequestConfig = {
    headers : {
        'Content-Type' : 'application/json',
        'Accept'       : 'application/json'
    }
};

const proxy = axios.create(proxyConfig);

function transformOrderingInfoItems(items: any[]): any[] {
    return (items || []).map((item: any) => ({
        title : item.fields.title,
        body  : item.fields.body,
        image : item.fields.image.fields.file.url
    }));
}

export const apiGetCateringPageContent = createAsyncThunk(
    'catering/fetchPageContent',
    async ({config}: any): Promise<any> => {
        // Fetch items from Contentful
        const contentTypeId = 'cateringPage';
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
            overview              : fields.overview,
            orderingInfo          : transformOrderingInfoItems(fields.orderingInfo),
            faqs                  : [faqs] // NOTE: array of faqGroups expected
        };
    }
);

interface ICateringState
{
    contentful: any;
    loading: boolean;
    error: Error | string | null;
}

export const initialState: ICateringState = {
    contentful : {},
    loading    : false,
    error      : ((null as unknown) as string)
};

export const cateringSlice = createSlice({
    name          : 'catering',
    initialState,
    extraReducers : (builder) => {
        /*
         * apiGetCateringPageContent Cases
         */
        builder.addCase(apiGetCateringPageContent.pending, (state, action) => {
            state.error   = null;
            state.loading = true;
        });

        builder.addCase(apiGetCateringPageContent.rejected, (state, action) => {
            state.error   = action.error.message || null;
            state.loading = false;
        });

        builder.addCase(apiGetCateringPageContent.fulfilled, (state, action) => {
            state.error      = null;
            state.contentful = {...action.payload};
            state.loading    = false;
        });
    },

    reducers : {}
});


const {actions, reducer} = cateringSlice;
export default reducer;

/**
 * ACTIONS
 */


/**
 * ADDITIONAL SELECTORS
 */
