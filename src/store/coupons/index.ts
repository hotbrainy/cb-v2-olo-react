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


// https://api.tst.chickentreat.com.au/mobile-services/layout/couponSearch/<COUPON_CODE>
export const apiSearchCoupons = createAsyncThunk(
    'coupons/search',
    async ({config, couponCode}: { config: any; couponCode: string; }): Promise<any> => {
        // TODO: review this... if it runs into CORS errors, then it will need a proxied request
        const url = `${config.api.MOBILE_SERVICES_API}/layout/couponSearch/${couponCode}`;
        //console.log('apiSearchCoupons: REQ - ' + JSON.stringify({url}));
        const response = await sendApiRequest(config, proxy, (apiClient) => apiClient.get(url));
        //console.log('apiSearchCoupons: RES - ' + JSON.stringify({data : response.data}));
        return response.data;
    }
);

interface IApiGetProductForPluCouponParams
{
    config   : any;
    storeId  : string;
    menuType : MenuType;
    plu      : string;
}

export const apiGetProductForPluCoupon = createAsyncThunk(
    'coupons/plu/product',
    async ({config, storeId, menuType, plu}: IApiGetProductForPluCouponParams): Promise<any> => {
        const url      = `${config.app.URL}${proxyBaseUrl}/products/byplu/${storeId}/${plu}/${menuType}`;
        //console.log('apiGetProductForPluCoupon: REQ - ' + JSON.stringify({url}));
        const response = await sendApiRequest(config, proxy, (apiClient) => apiClient.get(url));
        //console.log('apiGetProductForPluCoupon: RES - ' + JSON.stringify({data: response.data}));
        return response.data;
    }
);

export interface ICoupon
{
    amount?         : number;
    code?           : string;
    discountType?   : string;
    minSpend?       : number;
    sortOrder?      : number;
    title?          : string;
}

export interface ICouponsState
{
    loading          : boolean;
    error            : Error | string | null;
    currentCoupon    : any | null;
    pluCouponProduct : IProduct | null;
}

export const initialState: ICouponsState = {
    loading          : false,
    error            : (null as unknown) as string,
    currentCoupon    : null,
    pluCouponProduct : null
};

export const couponsSlice = createSlice({
    name          : 'coupons',
    initialState,
    extraReducers : (builder) => {
        /*
         * apiSearchCoupons Cases
         */
        builder.addCase(apiSearchCoupons.pending, (state, action) => {
            state.loading = true;
            state.error   = null;
        });

        builder.addCase(apiSearchCoupons.rejected, (state, action) => {
            state.error   = action.error.message || 'Something went wrong';
            state.loading = false;
        });

        builder.addCase(apiSearchCoupons.fulfilled, (state, action) => {
            state.error = null;
            // NOTE: use empty object to indicate the api was searched, but the coupon was not found.
            //       currentCoupon === null indicates no search has been performed
            state.currentCoupon = (action.payload || [{}])[0] || {};
            state.loading       = false;
        });

        /*
         * apiGetProductForPluCoupon Cases
         */
        builder.addCase(apiGetProductForPluCoupon.pending, (state, action) => {
            state.loading = true;
            state.error   = null;
        });

        builder.addCase(apiGetProductForPluCoupon.rejected, (state, action) => {
            state.error   = action.error.message || 'Something went wrong';
            state.loading = false;
        });

        builder.addCase(apiGetProductForPluCoupon.fulfilled, (state, action) => {
            state.error            = null;
            state.pluCouponProduct = {...action.payload};
            state.loading          = false;
        });
    },

    reducers : {
        setCurrentCoupon : (state, action) => {
            if (action.type === 'coupons/setCurrentCoupon') {
                state.currentCoupon = action.payload;
            }
        },

        clearCurrentCoupon : (state, action) => {
            if (action.type === 'coupons/clearCurrentCoupon') {
                state.currentCoupon    = null;
                state.pluCouponProduct = null;
            }
        }
    }
});

const {actions, reducer} = couponsSlice;
export default reducer;

/**
 * ACTIONS
 */
export const {clearCurrentCoupon} = actions;
export const {setCurrentCoupon}   = actions;

/**
 * ADDITIONAL SELECTORS
 */
