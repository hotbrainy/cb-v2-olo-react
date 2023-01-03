import _                    from 'lodash';
import axios                from 'axios';
import {AxiosInstance}      from 'axios';
import MockAdapter          from 'axios-mock-adapter';

// CB All Stores
// GET https://99hnlxip69.execute-api.ap-southeast-2.amazonaws.com/tst/?include=tradingHours
import apiGetStoresResponse from './CB All Stores.json';

const storeId: string = 'f443a0e2-629d-420a-b579-ec734785f98b';

const apiGetStoreByIdResponse = _.find(apiGetStoresResponse.data || [], (p) => p.id === storeId) || [];

function mockNetWorkResponse(customAxios?: AxiosInstance) {
    const mock = new MockAdapter(customAxios || axios);

    mock.onGet(/\/?\?include=tradingHours$/).reply(200, apiGetStoresResponse);

    // TODO: fix this endpoint
    // `/stores?id=${storeId}`
    mock.onGet(/\/stores\?id=([\w|-]+)$/).reply(200, apiGetStoreByIdResponse);
}

export {
    mockNetWorkResponse,
    // --
    storeId,
    apiGetStoresResponse,
    apiGetStoreByIdResponse
};
