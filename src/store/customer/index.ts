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
const storageKey_current        = 'customer/current';
const storageKey_currentAddress = 'customer/current-address';


export const apiSearchCustomerAddress = createAsyncThunk(
    'customer/search-address',
    async ({config, query}: { config: any; query: string; }): Promise<any> => {
        const queryStr = [
            `address=${encodeURIComponent(query)}`
        ].join('&');
        const url      = `${config.app.URL}${proxyBaseUrl}/customer/address/search?${queryStr}`;
        console.log('apiSearchCustomerAddress: REQ - ' + JSON.stringify({url}));
        const response = await sendApiRequest(config, proxy, (apiClient) => apiClient.get(url));
        console.log('apiSearchCustomerAddress: RES - ' + JSON.stringify({data : response.data}));
        return response.data;
    }
);

export const apiFetchGeocodedAddress = createAsyncThunk(
    'customer/fetch-geocoded-address',
    async ({config, referenceId}: { config: any; referenceId: string; }): Promise<any> => {
        const url = `${config.app.URL}${proxyBaseUrl}/customer/address/code/${encodeURIComponent(referenceId)}`;
        console.log('apiFetchGeocodedAddress: REQ - ' + JSON.stringify({url}));
        const response = await sendApiRequest(config, proxy, (apiClient) => apiClient.get(url));
        console.log('apiFetchGeocodedAddress: RES - ' + JSON.stringify({data : response.data}));
        return response.data;
    }
);

export interface ISearchAddress {
    address                 : string;
    referenceId             : string;
    addressComponents       : {
        country             : {
            longValue       : string;
            value           :string;
        }
        latitude            : {
            value : number
        };
        longitude           : {
            value : number
        };
        postcode            : {
            value : string
        };
        state               : {
            value : string
        };
        streetAddress       : {
            value : string
        };
        streetName          : {
            value : string
        };
        streetNumber        : {
            value : string
        };
        suburb              : {
            value : string
        };
    }
}

export interface ICustomer
{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    signUpForRewards: boolean;
}

export interface ICustomerState
{
    loading: boolean;
    error: Error | string | null;
    addressSearchResults: ReadonlyArray<string>;
    currentAddress: ISearchAddress | null;
    currentCustomer: ICustomer | null;
}

export const initialState: ICustomerState = {
    loading              : false,
    error                : (null as unknown) as string,
    addressSearchResults : [],
    currentAddress       : lsUtils.load<ISearchAddress | null>(storageKey_currentAddress, null),
    currentCustomer      : lsUtils.load<ICustomer | null>(storageKey_current, null)
};

export const customerSlice = createSlice({
    name          : 'customer',
    initialState,
    extraReducers : (builder) => {
        /*
         * apiSearchCustomerAddress Cases
         */
        builder.addCase(apiSearchCustomerAddress.pending, (state, action) => {
            state.loading = true;
            state.error   = null;
        });

        builder.addCase(apiSearchCustomerAddress.rejected, (state, action) => {
            state.error   = action.error.message || 'Something went wrong';
            state.loading = false;
        });

        builder.addCase(apiSearchCustomerAddress.fulfilled, (state, action) => {
            state.error                = null;
            state.addressSearchResults = action.payload || [];
            state.loading              = false;
        });

        /*
         * apiFetchGeocodedAddress Cases
         */
        builder.addCase(apiFetchGeocodedAddress.pending, (state, action) => {
            state.loading = true;
            state.error   = null;
        });

        builder.addCase(apiFetchGeocodedAddress.rejected, (state, action) => {
            state.error   = action.error.message || 'Something went wrong';
            state.loading = false;
        });

        builder.addCase(apiFetchGeocodedAddress.fulfilled, (state, action) => {
            state.error          = null;
            state.currentAddress = action.payload || null;
            lsUtils.save(storageKey_currentAddress, state.currentAddress);
            state.loading = false;
        });
    },

    reducers : {
        setCurrentCustomer : (state, action) => {
            if (action.type === 'customer/setCurrentCustomer') {
                state.currentCustomer = action.payload || null;
                lsUtils.save(storageKey_current, state.currentCustomer);
            }
        },

        clearCustomerAddress : (state, action) => {
            if (action.type === 'customer/clearCustomerAddress') {
                state.addressSearchResults = [];
                state.currentAddress       = null;
                lsUtils.save(storageKey_currentAddress, state.currentAddress);
            }
        },

        clearSearchResults : (state, action) => {
            if (action.type === 'customer/clearSearchResults') {
                state.addressSearchResults = [];
            }
        }
    }
});

const {actions, reducer} = customerSlice;
export default reducer;

/**
 * ACTIONS
 */
export const {clearSearchResults} = actions;
export const {clearCustomerAddress} = actions;
export const {setCurrentCustomer}   = actions;

/**
 * ADDITIONAL SELECTORS
 */
