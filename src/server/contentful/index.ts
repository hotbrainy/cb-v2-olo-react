import {createClient}    from 'contentful';
import {EntryCollection} from 'contentful';

const params = {
    environment : process.env.CONTENTFUL_ENVIRONMENT || 'master',
    space       : process.env.CONTENTFUL_SPACE_ID || '',
    accessToken : process.env.CONTENTFUL_DELIVERY_TOKEN || ''
};

export const client = createClient(params);

/**
 * Forward a query to the Contentful API
 * @param query
 * @returns {Promise<EntryCollection<unknown>>}
 */
export function fetchEntries(query: any): Promise<EntryCollection<unknown>> {
    return client.getEntries({
        include : 10, // Include nested entries up do 10 levels deep (max levels)
        ...query
    });
}
