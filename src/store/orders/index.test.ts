import reducer           from './';
import {initialState}    from './';
import {apiGetOrderById} from './';
import {orderId}         from './mock/tests.data';
import {store}           from '../';

const config = {
    api : {
        MOBILE_SERVICES_API : String(process.env.MOBILE_SERVICES_API_URL)
    },

    app : {
        URL : String(process.env.APIGATEWAY_URL)
    }
};

/**
 * Testing the initial state
 */
test('Should return initial state', () => {
    expect(reducer(undefined, {type : undefined})).toEqual(initialState);
});


/**
 * Testing the apiGetCategories thunk
 */
describe('Fetch order by id tests', () => {
    beforeAll(() => {
    });

    it('Should be able to fetch the order by id', async () => {
        const result = await store.dispatch(apiGetOrderById({config, orderId}));
        expect(result.type).toBe('orders/fetchById/fulfilled');

        const model = result.payload;
        const state = store.getState().orders;
        expect(state.currentOrder).toEqual(model);
    });
});
