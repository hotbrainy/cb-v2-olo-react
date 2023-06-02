import _                    from 'lodash';
import {createAsyncThunk}   from '@reduxjs/toolkit';
import {createSlice}        from '@reduxjs/toolkit';
import axios                from 'axios';
import {AxiosRequestConfig} from 'axios';
import lsUtils              from '../../utils/local-storage-utils';

const proxyBaseUrl = '/api/stores';

const proxyConfig: AxiosRequestConfig = {
    headers : {
        'Content-Type' : 'application/json',
        'Accept'       : 'application/json'
    }
};

export const proxy = axios.create(proxyConfig);

// localStorage Keys
const storageKey_current = 'stores/current';

export const apiGetStores = createAsyncThunk(
    'stores/fetch',
    async ({config}: any): Promise<any> => {
        const response = await proxy.get(config.app.URL + proxyBaseUrl + '/?include=tradingHours');
        return response.data;
    }
);

export const apiGetStoreById = createAsyncThunk(
    'stores/fetchById',
    async ({config, storeId}: {config: any; storeId: string}): Promise<any> => {
        const response = await proxy.get(config.app.URL + proxyBaseUrl + `/stores?id=${storeId}`);
        return response.data;
    }
);

interface IStoresState
{
    stores: any; // ReadonlyArray<IStore>;
    loading: boolean;
    error: Error | string | null;
    currentStore: any | null; // IStore | null;
}


export const initialState: IStoresState = {
    stores       : [],
    loading      : false,
    error        : ((null as unknown) as string),
    currentStore : lsUtils.load<any | null>(storageKey_current, null)
};

export const storeSlice = createSlice({
    name          : 'stores',
    initialState,
    extraReducers : (builder) => {
        /*
         * apiGetStoreById Cases
         */
        builder.addCase(apiGetStoreById.pending, (state, action) => {
            state.loading = true;
            state.error   = null;
        });

        builder.addCase(apiGetStoreById.rejected, (state, action) => {
            state.error   = action.error.message || 'Something went wrong';
            state.loading = false;
        });

        builder.addCase(apiGetStoreById.fulfilled, (state, action) => {
            state.error        = null;
            state.currentStore = action.payload;
            lsUtils.save(storageKey_current, state.currentStore);
            state.loading = false;
        });

        /*
         * apiGetStores Cases
         */
        builder.addCase(apiGetStores.pending, (state, action) => {
            state.loading = true;
            state.error   = null;
        });

        builder.addCase(apiGetStores.rejected, (state, action) => {
            state.error   = action.error.message || 'Something went wrong';
            state.loading = false;
        });

        builder.addCase(apiGetStores.fulfilled, (state, action) => {
            // console.log(JSON.stringify({stores: action.payload.data}, null, 4));

            state.error   = null;
            state.loading = false;
            state.stores  = action.payload.data;
        });
    },

    reducers : {
        setCurrentStore : (state, action) => {
            if (action.type === 'stores/setCurrentStore') {
                state.currentStore = action.payload;
                lsUtils.save(storageKey_current, state.currentStore);
            }
        }
    }
});

const {actions, reducer} = storeSlice;
export default reducer;

/**
 * ACTIONS
 */
export const {setCurrentStore} = actions;


/**
 * ADDITIONAL SELECTORS
 */
