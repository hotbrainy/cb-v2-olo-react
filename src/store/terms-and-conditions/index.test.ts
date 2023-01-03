import reducer                            from './';
import {initialState}                     from './';
import {apiGetTermsConditionsPageContent} from './';
import {store}                            from '../';

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
 * Testing the apiGetTermsConditionsPageContent thunk
 */
describe('Fetch terms & conditions page content tests', () => {
    beforeAll(() => {
    });

    it('Should fetch terms & conditions page content', async () => {
        const result = await store.dispatch(apiGetTermsConditionsPageContent({config}));
        expect(result.type).toBe('terms-conditions/fetchPageContent/fulfilled');

        const model = result.payload;
        const state = store.getState().termsConditions;
        expect(state.contentful).toEqual(model);
    });
});
