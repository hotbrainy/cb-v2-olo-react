import reducer                   from './';
import {initialState}            from './';
import {apiGetStoreById}         from './';
import {apiGetStores}            from './';
import {storeId}                 from './mock/tests.data';
import {apiGetStoreByIdResponse} from './mock/tests.data';
import {apiGetStoresResponse}    from './mock/tests.data';
import {store}                   from '../';

const config = {
    app : {
        URL : 'http://localhost:3000'
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
describe('Fetch all stores tests', () => {
    beforeAll(() => {
    });

    it('Should be able to fetch the store list', async () => {
        const result = await store.dispatch(apiGetStores({config}));
        expect(result.type).toBe('stores/fetch/fulfilled');

        const models = result.payload;

        // NOTE: removed, since we don't control what's currently on the CB API
        // expect(models).toEqual(apiGetStoresResponse);

        expect(models).toHaveProperty('data');

        const state = store.getState().stores;
        expect(state.stores).toEqual(models.data);
    });
});

/**
 * Testing the apiGetStoreById thunk
 */
// describe('Fetch single store tests', () => {
//     beforeAll(() => {
//     });
//
//     it('Should be able to fetch the store object', async () => {
//         const result = await store.dispatch(apiGetStoreById({config, storeId}));
//         const model  = result.payload;
//
//         expect(result.type).toBe('stores/fetchById/fulfilled');
//         expect(model).toEqual(apiGetStoreByIdResponse);
//
//         const state = store.getState().stores;
//
//         expect(state.loading).toBe(false);
//         expect(state.currentStore).toEqual(apiGetStoreByIdResponse);
//     });
// });
