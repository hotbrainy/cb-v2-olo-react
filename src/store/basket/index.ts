import {createSlice} from '@reduxjs/toolkit';
import lsUtils       from '../../utils/local-storage-utils';
import _             from 'lodash';

// localStorage Keys
const storageKey_orderKindId = 'basket/order-kind-id';

interface IBasketItem
{
    product: IProduct;
    quantity: number;
}


interface IOrderingOption
{
    id: string;
    title: string;
}

interface IBasketState
{
    orderingOptions: ReadonlyArray<IOrderingOption>;
    orderKindId: string;
    basketItems: ReadonlyArray<IBasketItem>;
}

// TODO: find a more appropriate home for these ???
const orderingOptions = [
    {id : 'pickup', title : 'Pickup'},
    {id : 'delivery', title : 'Delivery'},
    {id : 'catering', title : 'Catering'}
];

export const initialState: IBasketState = {
    orderingOptions,
    // 'pickup' | 'delivery' | 'catering'
    orderKindId : lsUtils.load<string>(storageKey_orderKindId, null) || 'pickup',
    basketItems : []
};


export const basketSlice = createSlice({
    name : 'basket',
    initialState,

    reducers : {
        // addProduct : (state, action) => {
        //     state.basketItems.push(action.payload as IProduct);
        // },

        setOrderKindId : (state, action) => {
            if (action.type === 'basket/setOrderKindId') {
                state.orderKindId = action.payload;
                lsUtils.save(storageKey_orderKindId, state.orderKindId);
            }
        }
    }
});


const {actions, reducer} = basketSlice;
export default reducer;

/**
 * ACTIONS
 */
      // export const {addProduct} = actions;
export const {setOrderKindId} = actions;


/**
 * ADDITIONAL SELECTORS
 */
/**
 * Return specified ordering option
 * @param state
 * @param {string} orderKindId
 * @returns {IOrderingOption}
 */
export function selectOrderingOptionById(state: any, orderKindId: string): IOrderingOption {
    const {orderingOptions} = state['basket'];
    return _.find(orderingOptions || [], (p) => p.id === orderKindId);
}