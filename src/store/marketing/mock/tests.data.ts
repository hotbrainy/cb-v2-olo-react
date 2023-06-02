import axios           from 'axios';
import {AxiosInstance} from 'axios';
import {AxiosResponse} from 'axios';
import MockAdapter     from 'axios-mock-adapter';

import apiMarketingSubscribeResponse from './marketing-subscribe-response.json';

const name: string      = 'Joe';
const email: string     = 'joe.bloggs@example.com';
const priceTier: string = 'Tier 1';
const phone: string     = '61412345678';

function mockNetWorkResponse(customAxios?: AxiosInstance): MockAdapter {
    const mock = new MockAdapter(customAxios || axios);

    mock.onGet(/\/marketing\/subscribe$/).reply(200, apiMarketingSubscribeResponse);

    return mock;
}

function sendApiRequest(
    config: any,
    apiClient: AxiosInstance,
    action: (apiClient: AxiosInstance) => Promise<AxiosResponse<any, any>>
): Promise<AxiosResponse<any, any>> {
    // Wrap the axios instance in a MockAdapter (if using mock data)
    let mock = config.api.USE_MOCK_DATA
        ? mockNetWorkResponse(apiClient)
        : null
    ;
    try {
        return action(apiClient);
    }
    finally {
        if (mock) {
            // Remove mock adapter from axios instance
            mock.restore();
        }
    }
}


export {
    mockNetWorkResponse,
    // --
    sendApiRequest,
    // --
    name,
    email,
    priceTier,
    phone,
    apiMarketingSubscribeResponse
};
