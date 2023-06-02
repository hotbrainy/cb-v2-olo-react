// TODO: convert this module to typescript

export default class Parameters
{
    static get BUSINESS_NAME() {
        return {
            name : 'BUSINESS_NAME',
            path : process.env.SSM_BUSINESS_NAME
        };
    }

    static get GLOBAL_LOG_LEVELS() {
        return {
            name : 'GLOBAL_LOG_LEVELS',
            path : process.env.SSM_GLOBAL_LOG_LEVELS
        };
    }

    static get MOBILE_SERVICES_API_KEY() {
        return {
            name : 'MOBILE_SERVICES_API_KEY',
            path : process.env.SSM_MOBILE_SERVICES_API_KEY
        };
    }

    static get MOBILE_SERVICES_API_URL() {
        return {
            name : 'MOBILE_SERVICES_API_URL',
            path : process.env.SSM_MOBILE_SERVICES_API_URL
        };
    }

    static get CONTENTFUL_ENVIRONMENT() {
        return {
            name : 'CONTENTFUL_ENVIRONMENT',
            path : process.env.SSM_CONTENTFUL_ENVIRONMENT
        };
    }

    static get CONTENTFUL_SPACE_ID() {
        return {
            name : 'CONTENTFUL_SPACE_ID',
            path : process.env.SSM_CONTENTFUL_SPACE_ID
        };
    }

    static get CONTENTFUL_DELIVERY_TOKEN() {
        return {
            name : 'CONTENTFUL_DELIVERY_TOKEN',
            path : process.env.SSM_CONTENTFUL_DELIVERY_TOKEN
        };
    }

    static get GLOBAL_STORE_DELIVERY_FEE() {
        return {
            name: 'GLOBAL_STORE_DELIVERY_FEE',
            path: process.env.SSM_GLOBAL_STORE_DELIVERY_FEE
        };
    }

    /**
     * Gets all the API parameters
     * @return {string[]}
     */
    static get API_PARAMETERS() {
        return [
            Parameters.BUSINESS_NAME,
            Parameters.GLOBAL_LOG_LEVELS,
            // --
            Parameters.MOBILE_SERVICES_API_KEY,
            Parameters.MOBILE_SERVICES_API_URL,
            // --
            Parameters.CONTENTFUL_ENVIRONMENT,
            Parameters.CONTENTFUL_SPACE_ID,
            Parameters.CONTENTFUL_DELIVERY_TOKEN,
            // --
            Parameters.GLOBAL_STORE_DELIVERY_FEE
        ];
    }
}
