import reducer                                     from './';
import {initialState}                              from './';
import {proxy}                                     from './';
import {apiGetCategories}                          from './';
import {mockNetWorkResponse}                       from './mock/tests.data';
import {storeId, menuType}                         from './mock/tests.data';
import {apiGetCategoriesDeliveryAndPickupResponse} from './mock/tests.data';
import {apiGetCategoriesDeliveryResponse}          from './mock/tests.data';
import {apiGetCategoriesPickupResponse}            from './mock/tests.data';
import {apiGetCategoriesEatInResponse}             from './mock/tests.data';
import {store}                                     from '../';

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
 * Testing the apiGetCategories thunk
 */
describe('Fetch all categories tests', () => {
    beforeAll(() => {
        mockNetWorkResponse(proxy);
    });

    it('Should be able to fetch the store product category list', async () => {
        const result = await store.dispatch(apiGetCategories({config, storeId, menuType}));
        expect(result.type).toBe('categories/fetch/fulfilled');

        const models = result.payload;
        const state  = store.getState().categories;
        expect(state.categories).toEqual(models);

        switch (menuType) {
            case 0:
                expect(state.categories)
                    .toEqual(apiGetCategoriesDeliveryAndPickupResponse)
                ;
                break;

            case 1:
                expect(state.categories)
                    .toEqual(apiGetCategoriesDeliveryResponse)
                ;
                break;

            case 2:
                expect(state.categories)
                    .toEqual(apiGetCategoriesPickupResponse)
                ;
                break;

            case 3:
                expect(state.categories)
                    .toEqual(apiGetCategoriesEatInResponse)
                ;
                break;

            default:
                throw new Error(`Invalid menuType: ${menuType}`);
        }
    });
});
