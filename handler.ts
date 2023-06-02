import 'source-map-support/register';
import {Context}                 from 'aws-lambda';
import {APIGatewayEvent}         from 'aws-lambda';
import {APIGatewayProxyResultV2} from 'aws-lambda';

// Contentful handler
import {fetchEntries} from './src/server/contentful';

// CB API handler
import {proxiedApiRequest} from './src/server/api';


export async function serve(event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResultV2> {
    try {
        // We use asynchronous import here, so we can better catch server-side errors during development
        const render = (await import('./src/server/render')).default;
        return {
            statusCode : 200,
            headers    : {'Content-Type' : 'text/html'},
            body       : await render(event)
        };
    }
    catch (error) {
        // Custom error handling for server-side errors
        // TODO: Prettify the output, include the callstack, e.g. by using `youch` to generate beautiful error pages
        console.error(error);
        return {
            statusCode : 500,
            headers    : {'Content-Type' : 'text/html'},
            body       : `<html lang="en"><body>${error.toString()}</body></html>`
        };
    }
}

export async function api(event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResultV2> {
    try {
        let response: any;

        // console.log(JSON.stringify({event, _context}));

        const path = (event.path || '');

        if (path.startsWith('/api/categories')) {
            response = await proxiedApiRequest({
                event,
                proxyBaseUrl : '/api/categories',
                apiBaseUrl   : process.env.PRODUCTS_BASE_URL || '',
                apiKey       : process.env.PRODUCTS_API_KEY || ''
            });
        }
        else if (path.startsWith('/api/stores')) {
            response = await proxiedApiRequest({
                event,
                proxyBaseUrl : '/api/stores',
                apiBaseUrl   : process.env.STORES_BASE_URL || '',
                apiKey       : process.env.STORES_API_KEY || ''
            });
        }
        else {
            return {
                statusCode : 404,
                headers    : {'Content-Type' : 'application/json'},
                body       : JSON.stringify({error : 'not found'})
            };
        }

        return {
            statusCode : response.status,
            headers    : {'Content-Type' : 'application/json'},
            body       : JSON.stringify(response.data)
        };
    }
    catch (error) {
        console.error(error);
        return {
            statusCode : 500,
            headers    : {'Content-Type' : 'application/json'},
            body       : JSON.stringify({error : error.toString()})
        };
    }
}

export async function contentful(event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResultV2> {
    try {
        // console.log(JSON.stringify({event, _context}));

        const jsonObj  = (typeof (event.body) === 'string')
            ? JSON.parse(event.body || '{}')
            : (event.body || {})
        ;
        const response = await fetchEntries(jsonObj);
        return {
            statusCode : 200,
            headers    : {'Content-Type' : 'application/json'},
            body       : JSON.stringify(response)
        };
    }
    catch (error) {
        console.error(error);
        return {
            statusCode : 500,
            headers    : {'Content-Type' : 'application/json'},
            body       : JSON.stringify({error : error.toString()})
        };
    }
}
