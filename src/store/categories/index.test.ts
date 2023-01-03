import reducer             from './';
import {initialState}      from './';
import {apiGetCategories}  from './';
import {storeId, menuType} from './mock/tests.data';
import {store}             from '../';

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
    });

    it('Should be able to fetch the store product category list', async () => {
        const result = await store.dispatch(apiGetCategories({config, storeId, menuType}));
        expect(result.type).toBe('categories/fetch/fulfilled');

        const models = result.payload;
        const state  = store.getState().categories;
        expect(state.categories).toEqual(models);
    });
});
