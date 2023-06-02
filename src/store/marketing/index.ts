import _                    from 'lodash';
import {createAsyncThunk}   from '@reduxjs/toolkit';
import {createSlice}        from '@reduxjs/toolkit';
import axios                from 'axios';
import {AxiosRequestConfig} from 'axios';
import {sendApiRequest}     from './mock/tests.data';
import {getFileUrl}         from '../../utils/contentful';

const proxyBaseUrl = '/api-proxy';

const proxyConfig: AxiosRequestConfig = {
    headers : {
        'Content-Type' : 'application/json',
        Accept         : 'application/json'
    }
};

export const proxy = axios.create(proxyConfig);

export interface IMarketingSubscribeParams
{
    name: string;
    email: string;
    priceTier: string;
    phone?: string | null;
}

export const apiMarketingSubscribe = createAsyncThunk(
    'marketing/subscribe',
    async ({config, params}: { config: any; params: IMarketingSubscribeParams; }): Promise<any> => {
        const url      = `${config.app.URL}${proxyBaseUrl}/marketing/subscribe`;
        const payload  = {...params};
        //console.log('apiMarketingSubscribe: - REQ' + JSON.stringify({url, payload}));
        const response = await sendApiRequest(config, proxy, (apiClient) => apiClient.post(url, payload));
        //console.log('apiMarketingSubscribe: - RES' + JSON.stringify({url, data : response.data}));

        return response.data;
    }
);

export interface IPricingTier
{
    postcode: string;
    suburb: string;
    state: string;
    priceTier: string;
}

export const apiFetchPricingTierData = createAsyncThunk(
    'marketing/pricing-tier-csv',
    async ({config}: { config: any; }): Promise<IPricingTier[]> => {
        const pricingTierCsvContentfulAssetId = '4IsMLgkSCuR4uuElGN8riR'; // TODO: load from a config ???
        const url                             = `${config.app.URL}/contentful-proxy/assets/${pricingTierCsvContentfulAssetId}`;
        //console.log('apiFetchPricingTierData: - REQ' + JSON.stringify({url}));
        const response                        = await sendApiRequest(config, proxy, (apiClient) => apiClient.get(url));
        //console.log('apiFetchPricingTierData: - RES' + JSON.stringify({url, data : response.data}));

        try {
            // Sanity check... ensure the csv file is not a ridiculously large size
            const maxFileSizeBytes = 256 * 1024; // 256KB should be more than sufficient for this csv // TODO: load from a config ???
            const csvFileSizeBytes = parseInt(_.get(response, 'data.fields.file.details.size') || '0', 10);
            if ((csvFileSizeBytes <= 0) || (csvFileSizeBytes > maxFileSizeBytes)) {
                throw new Error(`Invalid pricing tier csv file size: ${csvFileSizeBytes} bytes`);
            }

            // Extract the url of the remote csv file
            const csvUrl = getFileUrl(response.data, '');
            if (_.isEmpty(csvUrl)) {
                throw new Error(`Missing pricing tier csv file url`);
            }

            // Fetch the remote csv file
            const res = await axios.get(`https://${csvUrl!}`);
            if (_.isEmpty(res?.data)) {
                throw new Error(`Missing pricing tier csv data for url: ${csvUrl}`);
            }

            // Convert the csv to json (crude poor man's csv parser... could use an npm package instead)
            const rows                              = res.data.split('\n');
            const headers                           = rows[0].split(',').map((p: string) => p.trim());
            const headerMap: Record<string, string> = {Pcode : 'postcode', Locality : 'suburb', State : 'state', Price_Tier : 'priceTier'};
            return rows.reduce((items: any[], row: string, ii: number): any => {
                // Skip the header row
                if (ii > 0) {
                    const item = (row || '')
                        .split(',')                    // columns are expected to be comma separated
                        .map((p: string) => p.trim())           // sanitize the cell data
                        .filter((p: string) => !_.isEmpty(p))   // discard any lines that contain an empty cell
                        .reduce((obj: any, cell: string, jj: number): any => ({...obj, [headerMap[headers[jj]]] : cell}), {})
                    ;

                    if (!_.isEmpty(item)) {
                        items.push(item);
                    }
                }

                return items;
            }, []).filter((p: any) => !_.isEmpty(p));
        }
        catch (err) {
            // Return empty object rather than null to indicate a request has been executed (reduces spamming of api requests)
            return [];
        }
    }
);


export interface IMarketingState
{
    loading: boolean;
    error: Error | string | null;
    subscriptionId: string | null;
    pricingTierData: IPricingTier[] | null;
}

export const initialState: IMarketingState = {
    loading         : false,
    error           : (null as unknown) as string,
    subscriptionId  : null,
    pricingTierData : null
};

const marketingSlice = createSlice({
    name : 'marketing',

    initialState,

    extraReducers : (builder) => {
        /*
         * apiMarketingSubscribe Cases
         */
        builder.addCase(apiMarketingSubscribe.pending, (state, action) => {
            state.loading = true;
            state.error   = null;
        });

        builder.addCase(apiMarketingSubscribe.rejected, (state, action) => {
            state.error = action.error.message || 'Something went wrong';
            console.error(state.error);
            state.loading = false;
        });

        builder.addCase(apiMarketingSubscribe.fulfilled, (state, action) => {
            state.error          = null;
            state.subscriptionId = action.payload || null;
            state.loading        = false;
        });

        /*
         * apiFetchPricingTierData Cases
         */
        builder.addCase(apiFetchPricingTierData.pending, (state, action) => {
            state.loading = true;
            state.error   = null;
        });

        builder.addCase(apiFetchPricingTierData.rejected, (state, action) => {
            state.error = action.error.message || 'Something went wrong';
            console.error(state.error);
            state.loading = false;
        });

        builder.addCase(apiFetchPricingTierData.fulfilled, (state, action) => {
            state.error           = null;
            state.pricingTierData = {...action.payload};
            state.loading         = false;
        });
    },

    reducers : {
        clearSubscription : (state, action) => {
            if (action.type === 'marketing/clearSubscription') {
                state.error          = null;
                state.subscriptionId = null;
            }
        }
    }
});


const {actions, reducer} = marketingSlice;
export default reducer;


/**
 * ACTIONS
 */
export const {clearSubscription} = actions;
