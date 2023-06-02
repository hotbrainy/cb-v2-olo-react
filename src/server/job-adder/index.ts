import axios             from 'axios';
import {AxiosPromise}    from 'axios';
import {APIGatewayEvent} from 'aws-lambda';

export interface IProxiedJobAdderRequestParams
{
    event: APIGatewayEvent,
    proxyBaseUrl: string,
    jobAdderApiUrl: string,
    jobAdderApiKey: string
}

/**
 * Forward a request to the jobadder api
 * @param {IProxiedJobAdderRequestParams} params
 * @returns {AxiosPromise<any>}
 */
export function proxiedJobAdderRequest(params: IProxiedJobAdderRequestParams): AxiosPromise<any> {
    // ref: https://api.jobadder.com/v2/docs#section/Getting-Started/Authentication
    
    throw new Error('not implemented');

    // const {event} = params;
    //
    // // Remove the original proxy base url
    // const url = event.path.replace(params.proxyBaseUrl, '');
    //
    // const axiosConfig = {
    //     url,
    //     baseURL : params.jobAdderApiUrl,
    //     method  : event.httpMethod,
    //     params  : event.queryStringParameters,
    //     data    : event.body || undefined,
    //     headers : {
    //         'x-api-key'    : params.jobAdderApiKey,
    //         'Content-Type' : 'application/json',
    //         'Accept'       : 'application/json'
    //     }
    // };
    //
    // // console.log(JSON.stringify({axiosConfig}));
    //
    // return axios(axiosConfig);
}

export default proxiedJobAdderRequest;
