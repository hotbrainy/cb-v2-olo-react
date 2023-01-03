import reducer                    from './';
import {initialState}             from './';
import {apiGetCareersPageContent} from './';
import {store}                    from '../';

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
 * Testing the apiGetCareersPageContent thunk
 */
describe('Fetch careers page content tests', () => {
    beforeAll(() => {
    });

    it('Should fetch careers page content', async () => {
        const result = await store.dispatch(apiGetCareersPageContent({config}));
        expect(result.type).toBe('careers/fetchPageContent/fulfilled');

        const model = result.payload;
        const state = store.getState().careers;
        expect(state.contentful).toEqual(model);
    });
});
