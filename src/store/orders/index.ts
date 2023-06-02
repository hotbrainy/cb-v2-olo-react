import _                    from 'lodash';
import {createAsyncThunk}   from '@reduxjs/toolkit';
import {createSlice}        from '@reduxjs/toolkit';
import axios                from 'axios';
import {AxiosRequestConfig} from 'axios';
import lsUtils              from '../../utils/local-storage-utils';
import {sendApiRequest}     from './mock/tests.data';

const proxyBaseUrl = '/api-proxy';

const proxyConfig: AxiosRequestConfig = {
    headers : {
        'Content-Type' : 'application/json',
        Accept         : 'application/json'
    }
};

export const proxy = axios.create(proxyConfig);

// localStorage Keys
const storageKey_current = 'orders/current';
const storageKey_orderId = 'orders/id';


export const apiGetOrderById = createAsyncThunk(
    'orders/fetchById',
    async ({config, orderId}: { config: any; orderId: string }): Promise<any> => {
        const url = `${config.app.URL}${proxyBaseUrl}/order/${orderId}`;
        console.log('apiGetOrderById: ' + JSON.stringify({url}));
        const response = await sendApiRequest(config, proxy, (apiClient) => apiClient.get(url));
        return response.data;
    }
);

export const apiSubmitOrder = createAsyncThunk(
    'orders/submit',
    async ({config, order}: { config: any; order: IOrder }): Promise<any> => {
        const url     = `${config.app.URL}${proxyBaseUrl}/order/create`;
        const payload = {data : order}; // TODO: transform this - why does it need a "data" wrapper ???
        console.log('apiSubmitOrder: - REQ' + JSON.stringify({url, payload}));
        const response = await sendApiRequest(config, proxy, (apiClient) => apiClient.post(url, payload));
        console.log('apiSubmitOrder: - RES' + JSON.stringify({url, data : response.data}));

        return response.data;
    }
);

export const apiNotifyIamhere = createAsyncThunk(
    'orders/iamhere',
    async ({config, orderId}: { config: any; orderId: string; }): Promise<any> => {
        const url = `${config.app.URL}${proxyBaseUrl}/order/iamhere/${orderId}`;
        console.log('apiNotifyIamhere: - REQ' + JSON.stringify({url}));
        const response = await sendApiRequest(config, proxy, (apiClient) => apiClient.get(url));
        console.log('apiNotifyIamhere: - RES' + JSON.stringify({url, data : response.data}));

        return response.data;
    }
);


interface IOrdersState
{
    loading: boolean;
    error: Error | string | null;
    currentOrder: IOrder | null;
    orderId: string | null;
}

export const initialState: IOrdersState = {
    loading      : false,
    error        : (null as unknown) as string,
    currentOrder : lsUtils.load<IOrder | null>(storageKey_current, null),
    orderId      : lsUtils.load<string | null>(storageKey_orderId, null)
};

export const ordersSlice = createSlice({
    name          : 'orders',
    initialState,
    extraReducers : (builder) => {
        /*
         * apiGetStoreById Cases
         */
        builder.addCase(apiGetOrderById.pending, (state, action) => {
            state.loading = true;
            state.error   = null;
        });

        builder.addCase(apiGetOrderById.rejected, (state, action) => {
            state.error   = action.error.message || 'Something went wrong';
            state.loading = false;
        });

        builder.addCase(apiGetOrderById.fulfilled, (state, action) => {
            state.error        = null;
            state.currentOrder = _.get(action.payload, 'data.attributes.data.attributes', {});
            lsUtils.save(storageKey_current, _.isEmpty(state.currentOrder) ? null : state.currentOrder);
            state.loading = false;
        });

        /*
         * apiSubmitOrder Cases
         */
        builder.addCase(apiSubmitOrder.pending, (state, action) => {
            state.loading = true;
            state.error   = null;
            state.loading = false;
        });

        builder.addCase(apiSubmitOrder.rejected, (state, action) => {
            state.error   = action.error.message || 'Something went wrong';
            state.loading = false;
        });

        builder.addCase(apiSubmitOrder.fulfilled, (state, action) => {
            state.error = null;

            // Cache the active order id
            state.orderId = action.payload?.data?.id || null;
            lsUtils.save(storageKey_orderId, state.orderId);

            state.loading = false;
        });

        /*
         * apiNotifyIamhere Cases
         */
        builder.addCase(apiNotifyIamhere.pending, (state, action) => {
            state.loading = true;
            state.error   = null;
            state.loading = false;
        });

        builder.addCase(apiNotifyIamhere.rejected, (state, action) => {
            state.error   = action.error.message || 'Something went wrong';
            state.loading = false;
        });

        builder.addCase(apiNotifyIamhere.fulfilled, (state, action) => {
            // -- Assign iamhere
            const result       = _.get(action.payload, 'data.attributes.data', null);
            const success      = (result?.type === 'checkin') && (result?.status === 'SUCCESS');
            // --
            state.currentOrder = result?.order || null;
            lsUtils.save(storageKey_current, state.currentOrder);
            // --
            state.error   = success ? null : result.message || 'Something went wrong';
            // --
            state.loading = false;
        });
    },

    reducers : {
        clearOrder : (state, action) => {
            if (action.type === 'orders/clearOrder') {
                // Clear active order id
                state.orderId = null;
                lsUtils.save(storageKey_orderId, state.orderId);

                // Clear current order
                state.currentOrder = null;
                lsUtils.save(storageKey_current, state.currentOrder);
            }
        }
    }
});

const {actions, reducer} = ordersSlice;
export default reducer;

/**
 * ACTIONS
 */
export const {clearOrder} = actions;

/**
 * ADDITIONAL SELECTORS
 */
