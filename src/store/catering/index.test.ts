import reducer                     from './';
import {initialState}              from './';
import {apiGetCateringPageContent} from './';
import {store}                     from '../';

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
 * Testing the apiGetCateringPageContent thunk
 */
describe('Fetch catering page content tests', () => {
    beforeAll(() => {
    });

    it('Should fetch catering page content', async () => {
        const result = await store.dispatch(apiGetCateringPageContent({config}));
        expect(result.type).toBe('catering/fetchPageContent/fulfilled');

        const model = result.payload;
        const state = store.getState().catering;
        expect(state.contentful).toEqual(model);
    });
});
