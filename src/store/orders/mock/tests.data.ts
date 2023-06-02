import axios                   from 'axios';
import {AxiosInstance}         from 'axios';
import {AxiosResponse}         from 'axios';
import MockAdapter             from 'axios-mock-adapter';

// All Stores
// GET https://api.tst.oporto.com.au/mobile-services/order/dfbe9fa9-b935-4bbe-ad15-dd08487b35b5
import apiGetOrderByIdResponse from './get-order-by-id-response.json';

// St Leonards - Pickup (submit-pickup-order-st-leonards.json)
const orderId: string = 'dfbe9fa9-b935-4bbe-ad15-dd08487b35b5';

function mockNetWorkResponse(customAxios?: AxiosInstance): MockAdapter {
    const mock = new MockAdapter(customAxios || axios);

    // `/order/${orderId}`
    mock.onGet(/\/order\/([\w|-]+)$/).reply(200, apiGetOrderByIdResponse);

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
    orderId,
    apiGetOrderByIdResponse
};
