import axios             from 'axios';
import {AxiosPromise}    from 'axios';
import {APIGatewayEvent} from 'aws-lambda';

export interface IProxiedApiRequestParams
{
    event: APIGatewayEvent,
    proxyBaseUrl: string,
    apiBaseUrl: string,
    apiKey: string
}

/**
 * Forward a request to the relevant CB API
 * @param {IProxiedApiRequestParams} params
 * @returns {AxiosPromise<any>}
 */
export function proxiedApiRequest(params: IProxiedApiRequestParams): AxiosPromise<any> {
    const {event} = params;

    // Remove the original proxy base url
    const url = event.path.replace(params.proxyBaseUrl, '');

    const axiosConfig = {
        url,
        baseURL : params.apiBaseUrl,
        method  : event.httpMethod,
        params  : event.queryStringParameters,
        data    : event.body || undefined,
        headers : {
            'x-api-key'    : params.apiKey,
            'Content-Type' : 'application/json',
            'Accept'       : 'application/json'
        }
    };

    // console.log(JSON.stringify({axiosConfig}));

    return axios(axiosConfig);
}

export default proxiedApiRequest;
