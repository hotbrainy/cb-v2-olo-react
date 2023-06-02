import reducer                            from './';
import {ICustomerState}                   from './';
import {initialState}                     from './';
import {apiSearchCustomerAddress}         from './';
import {addressQuery}                     from './mock/tests.data';
import {apiSearchCustomerAddressResponse} from './mock/tests.data';
import {store}                            from '../';

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
 * Testing the getStores thunk
 */
describe('Search customer address tests', () => {
    beforeAll(() => {
    });

    it('Should be able to fetch address search result list', async () => {
        const result = await store.dispatch(apiSearchCustomerAddress({config, query : addressQuery}));
        expect(result.type).toBe('customer/search-address/fulfilled');

        const models = result.payload;

        expect(models).toEqual(apiSearchCustomerAddressResponse);

        expect(models).toHaveProperty('data');

        const state = (store.getState().customer as ICustomerState);
        expect(state.addressSearchResults).toEqual(models.data);
    });
});
