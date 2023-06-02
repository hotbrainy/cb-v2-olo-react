import {createAsyncThunk}   from '@reduxjs/toolkit';
import {createSlice}        from '@reduxjs/toolkit';
import axios                from 'axios';
import {AxiosRequestConfig} from 'axios';
import {sendApiRequest}     from './mock/tests.data';

const proxyBaseUrl = '/api-proxy';

const proxyConfig: AxiosRequestConfig = {
    headers : {
        'Content-Type' : 'application/json',
        Accept         : 'application/json'
    }
};

export const proxy = axios.create(proxyConfig);

interface IPaymentGatewayState
{
    loading: boolean;
    error: Error | string | null;
    paymentGatewayHost: string | null;
    tokenizeCardUrl: string | null;
}

export const initialState: IPaymentGatewayState = {
    loading            : false,
    error              : null,
    paymentGatewayHost : null,
    tokenizeCardUrl    : null
};

export const apiGetPaymentGatewayTokenizeCardUrl = createAsyncThunk(
    'payment-gateway/cards/tokenize/url',
    async ({config, storeId}: { config: any, storeId: string }): Promise<any> => {
        // Pass the location of the fatzebra hosted payment page custom stylesheet so a hash can be generated
        const fatzebraHppCssUrl = encodeURIComponent(`${config.app.DIST_URL}/assets/styles/fatzebra_hpp.css`);
        const url               = `${config.app.URL}${proxyBaseUrl}/payment/hosted/tokenize-card/url?locationId=${storeId}&cssUrl=${fatzebraHppCssUrl}`;
        console.log('apiGetPaymentGatewayTokenizeCardUrl - REQ: ' + JSON.stringify({url}));
        const response = await sendApiRequest(config, proxy, (apiClient) => apiClient.get(url));
        console.log('apiGetPaymentGatewayTokenizeCardUrl - RES: ' + JSON.stringify({data : response.data}));
        return response.data;
    }
);

export const ordersSlice = createSlice({
    name          : 'payment-gateway',
    initialState,
    extraReducers : (builder) => {
        /*
         * apiGetPaymentGatewayTokenizeCardUrl Cases
         */
        builder.addCase(apiGetPaymentGatewayTokenizeCardUrl.pending, (state, action) => {
            state.loading = true;
            state.error   = null;
        });

        builder.addCase(apiGetPaymentGatewayTokenizeCardUrl.rejected, (state, action) => {
            state.error   = action.error.message || 'Something went wrong';
            state.loading = false;
        });

        builder.addCase(apiGetPaymentGatewayTokenizeCardUrl.fulfilled, (state, action) => {
            state.error              = null;
            state.paymentGatewayHost = (action.payload?.paymentGatewayHost || '').trim();
            state.tokenizeCardUrl    = (action.payload?.tokenizeCardUrl || '').trim();
            state.loading            = false;
        });
    },

    reducers : {}
});

const {reducer} = ordersSlice;
export default reducer;

/**
 * ACTIONS
 */

/**
 * ADDITIONAL SELECTORS
 */
