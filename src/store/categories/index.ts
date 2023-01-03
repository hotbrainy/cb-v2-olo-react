import _                    from 'lodash';
import {createAsyncThunk}   from '@reduxjs/toolkit';
import {createSlice}        from '@reduxjs/toolkit';
import axios                from 'axios';
import {AxiosRequestConfig} from 'axios';
import lsUtils              from '../../utils/local-storage-utils';

const proxyBaseUrl = '/api/categories';

const proxyConfig: AxiosRequestConfig = {
    headers : {
        'Content-Type' : 'application/json',
        'Accept'       : 'application/json'
    }
};

export const proxy = axios.create(proxyConfig);

// localStorage Keys
const storageKey_current = 'categories/current';

export const apiGetCategories = createAsyncThunk(
    'categories/fetch',
    async ({config, storeId, menuType}: {config: any, storeId: string, menuType: number}): Promise<any> => {
        const response = await proxy.get(config.app.URL + proxyBaseUrl + `/products/categories/${storeId}/${menuType}`);
        return response.data;
    }
);

interface ICategoriesState
{
    /**
     * List of product categories for the selected store
     * NOTE: this is a large dataset the dramatically affects redux performance
     *       So filter the required content to avoid accessing the entire dataset directly.
     *       eg.
     *           use the "selectCategories" method to access categories
     *           and "selectCategoryProducts" method to access the associated products
     */
    categories: ReadonlyArray<IProductCategory>;

    loading: boolean;
    error: Error | string | null;
    currentCategory: IProductCategory | null;
}

export const initialState: ICategoriesState = {
    categories : [],
    loading    : false,
    error      : ((null as unknown) as string),
    // currentCategory : null //lsUtils.load<IProductCategory>(storageKey_current, null)
    currentCategory : null
};

export const categorySlice = createSlice({
    name          : 'categories',
    initialState,
    extraReducers : (builder) => {
        /*
         * apiGetCategories Cases
         */
        builder.addCase(apiGetCategories.pending, (state, action) => {
            state.loading = true;
            state.error   = null;
        });

        builder.addCase(apiGetCategories.rejected, (state, action) => {
            state.error   = action.error.message || 'Something went wrong';
            state.loading = false;
        });

        builder.addCase(apiGetCategories.fulfilled, (state, action) => {
            state.error           = null;
            state.categories      = action.payload;
            state.currentCategory = _.first(state.categories) || null;
            lsUtils.save(storageKey_current, state.currentCategory);
            state.loading = false;
        });
    },

    reducers : {
        clearCategories : (state, action) => {
            if (action.type === 'categories/clearCategories') {
                state.categories      = [];
                state.currentCategory = null;
                lsUtils.save(storageKey_current, state.currentCategory);
            }
        },

        setCurrentCategory : (state, action) => {
            if (action.type === 'categories/setCurrentCategory') {
                state.currentCategory = action.payload;
                lsUtils.save(storageKey_current, state.currentCategory);
            }
        }
    }
});


const {actions, reducer} = categorySlice;
export default reducer;

/**
 * ACTIONS
 */
export const {clearCategories}    = actions;
export const {setCurrentCategory} = actions;


/**
 * ADDITIONAL SELECTORS
 */

/**
 * Return list of store categories, sorted by sortOrder ASC
 * NOTE: product data has been omitted for performance
 * @param state
 */
export function selectCategories(state: any): IProductCategory[] {
    // NOTE: use lodash sort, since native sort mutates the source array
    const categories = state['categories'].categories || [];
    return _
        .chain(categories)
        .map((p: IProductCategory) => ({...p, products : []}))
        .sortBy((p: IProductCategory) => p.sortOrder)
        .value()
        ;
}

/**
 * Return list of category products, sorted by sortOrder ASC
 * @param state
 * @param {string} categoryId
 * @returns {IProduct[]}
 */
export function selectCategoryProducts(state: any, categoryId: string): IProduct[] {
    // NOTE: use lodash sort, since native sort mutates the source array
    const categories = state['categories'].categories || [];
    const category   = _.find(categories, (p) => p.id === categoryId);
    return (category && category.products)
        ? _.sortBy(category.products, (p) => p.sortOrder)
        : []
        ;
}