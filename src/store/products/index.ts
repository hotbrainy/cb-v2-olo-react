import {createSlice} from '@reduxjs/toolkit';
import lsUtils       from '../../utils/local-storage-utils';

// localStorage Keys
const storageKey_viewMode = 'products/view-mode';
const storageKey_current  = 'products/current';

interface IProductsState
{
    viewMode: string; //'grid' | 'list';
    currentProduct: IProduct | null;
}

export const initialState: IProductsState = {
    viewMode       : lsUtils.load<string>(storageKey_viewMode) || 'list',
    currentProduct : lsUtils.load<IProduct>(storageKey_current, null)
};

const productSlice = createSlice({
    name : 'products',

    initialState,

    reducers : {
        setViewMode : (state, action) => {
            if (action.type === 'products/setViewMode') {
                state.viewMode = action.payload;
                lsUtils.save(storageKey_viewMode, state.viewMode);
            }
        },

        setCurrentProduct : (state, action) => {
            if (action.type === 'products/setCurrentProduct') {
                state.currentProduct = action.payload;
                lsUtils.save(storageKey_current, state.currentProduct);
            }
        }
    }
});


const {actions, reducer} = productSlice;
export default reducer;


/**
 * ACTIONS
 */
export const {setViewMode}       = actions;
export const {setCurrentProduct} = actions;
