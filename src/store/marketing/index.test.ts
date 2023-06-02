import reducer                 from './';
import {initialState}          from './';
import {apiMarketingSubscribe} from './';
import {store}                 from '../';
// --
import {name}                  from './mock/tests.data';
import {email}                 from './mock/tests.data';
import {priceTier}             from './mock/tests.data';
import {phone}                 from './mock/tests.data';

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
 * Testing the apiMarketingSubscribe thunk
 */
describe('Marketing subscribe tests', () => {
    beforeAll(() => {
    });

    it('Should be able to subscribe to marketing', async () => {
        const result = await store.dispatch(apiMarketingSubscribe({config, params : {name, email, priceTier, phone}}));
        expect(result.type).toBe('marketing/subscribe/fulfilled');

        const model = result.payload;
        const state = store.getState().marketing;
        expect(state.error).toBe(null);
    });
});
