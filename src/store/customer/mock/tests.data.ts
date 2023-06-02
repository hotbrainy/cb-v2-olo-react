import axios                            from 'axios';
import {AxiosInstance}                  from 'axios';
import {AxiosResponse}                  from 'axios';
import MockAdapter                      from 'axios-mock-adapter';

// Search customer address
// GET https://api.tst.oporto.com.au/mobile-services/customer/address/search?address=359%20Queen%20St%2C%20Brisbane
import apiSearchCustomerAddressResponse from './search-customer-address-response.json';

const addressQuery: string = '359 Queen St, Brisbane';

function mockNetWorkResponse(customAxios?: AxiosInstance): MockAdapter {
    const mock = new MockAdapter(customAxios || axios);

    // `/customer/address/search?address=${query}`
    mock.onGet(/\/customer\/address\/search?address=(.*)$/).reply(200, apiSearchCustomerAddressResponse);

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
    addressQuery,
    apiSearchCustomerAddressResponse
};
