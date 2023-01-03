import reducer                 from './';
import {initialState}          from './';
import {apiGetFaqsPageContent} from './';
import {store}                 from '../';

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
 * Testing the apiGetFaqsPageContent thunk
 */
describe('Fetch faqs page content tests', () => {
    beforeAll(() => {
    });

    it('Should fetch faqs page content', async () => {
        const result = await store.dispatch(apiGetFaqsPageContent({config}));
        expect(result.type).toBe('faqs/fetchPageContent/fulfilled');

        const model = result.payload;
        const state = store.getState().faqs;
        expect(state.contentful).toEqual(model);
    });
});
