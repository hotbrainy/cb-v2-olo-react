import reducer            from './';
import {initialState}     from './';
import {apiSearchCoupons} from './';
import {couponCode}       from './mock/tests.data';
import {store}            from '../';

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
 * Testing the apiGetCategories thunk
 */
describe('Search for coupon code tests', () => {
    beforeAll(() => {
    });

    it('Should be able to find a coupon by coupon code', async () => {
        const result = await store.dispatch(apiSearchCoupons({config, couponCode}));
        expect(result.type).toBe('coupons/search/fulfilled');

        const models = result.payload;
        expect(models).to.not.be.empty();
        const state  = store.getState().coupons;
        expect(state.currentCoupon).toEqual(models[0]);
    });
});
