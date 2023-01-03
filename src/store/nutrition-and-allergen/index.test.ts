import reducer                              from './';
import {initialState}                       from './';
import {apiGetNutritionAllergenPageContent} from './';
import {store}                              from '../';

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
 * Testing the apiGetNutritionAllergenPageContent thunk
 */
describe('Fetch nutrition & allergen page content tests', () => {
    beforeAll(() => {
    });

    it('Should fetch nutrition & allergen page content', async () => {
        const result = await store.dispatch(apiGetNutritionAllergenPageContent({config}));
        expect(result.type).toBe('nutrition-allergen/fetchPageContent/fulfilled');

        const model = result.payload;
        const state = store.getState().nutritionAllergen;
        expect(state.contentful).toEqual(model);
    });
});
