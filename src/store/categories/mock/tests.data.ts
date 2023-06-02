import axios                                     from 'axios';
import {AxiosInstance}                           from 'axios';
import MockAdapter                               from 'axios-mock-adapter';

// CB-App-LW-Categores
// GET https://fcge3oq689.execute-api.ap-southeast-2.amazonaws.com/tst/products/categories/5f109866f3494b8ce30aaa56/1
import apiGetCategoriesDeliveryAndPickupResponse from './CB-App-LW-Categories-DeliveryAndPickup.json';
import apiGetCategoriesDeliveryResponse          from './CB-App-LW-Categories-Delivery.json';
import apiGetCategoriesPickupResponse            from './CB-App-LW-Categories-Pickup.json';
import apiGetCategoriesEatInResponse             from './CB-App-LW-Categories-EatIn.json';

const menuType: number   = 1; // Delivery
// const storeId: string    = 'f443a0e2-629d-420a-b579-ec734785f98b';
const storeId: string    = '5f109866f3494b8ce30aaa56';
const categoryId: string = '611cadce745942fa2b41074b';

function mockNetWorkResponse(customAxios?: AxiosInstance) {
    const mock = new MockAdapter(customAxios || axios);

    // `/api/categories/${storeId}/${menuType}`
    mock.onGet(/\/api\/categories\/([\w|-]+)\/0$/).reply(200, apiGetCategoriesDeliveryAndPickupResponse);
    mock.onGet(/\/api\/categories\/([\w|-]+)\/1$/).reply(200, apiGetCategoriesDeliveryResponse);
    mock.onGet(/\/api\/categories\/([\w|-]+)\/2$/).reply(200, apiGetCategoriesPickupResponse);
    mock.onGet(/\/api\/categories\/([\w|-]+)\/3$/).reply(200, apiGetCategoriesEatInResponse);
}

export {
    mockNetWorkResponse,
    // --
    storeId,
    menuType,
    categoryId,
    apiGetCategoriesDeliveryAndPickupResponse,
    apiGetCategoriesDeliveryResponse,
    apiGetCategoriesPickupResponse,
    apiGetCategoriesEatInResponse
};
