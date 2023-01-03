import reducer                          from './';
import {initialState}                   from './';
import {apiGetPrivacyPolicyPageContent} from './';
import {store}                          from '../';

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
 * Testing the apiGetPrivacyPolicyPageContent thunk
 */
describe('Fetch privacy policy page content tests', () => {
    beforeAll(() => {
    });

    it('Should fetch privacy policy page content', async () => {
        const result = await store.dispatch(apiGetPrivacyPolicyPageContent({config}));
        expect(result.type).toBe('privacy-policy/fetchPageContent/fulfilled');

        const model = result.payload;
        const state = store.getState().privacyPolicy;
        expect(state.contentful).toEqual(model);
    });
});
