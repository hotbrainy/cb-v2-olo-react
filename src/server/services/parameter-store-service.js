// TODO: convert this module to typescript

import _   from 'lodash';
import AWS from 'aws-sdk';

const {SSM} = AWS;

const cache = {};

export default class ParameterStoreService
{
    /**
     * ParameterStoreService Constructor
     * @param {*}        options
     * @param {[*]}      options.parameters
     * @param {boolean}  options.useCache
     * @param {SSM}      options.ssm
     */
    constructor(options = {}) {
        this.parameters = options.parameters || [];
        this.useCache   = (options.useCache === undefined) || options.useCache;
        this.ssm        = options.ssm || new SSM();
    }

    async load(parameters = this.parameters) {
        if (_.isEmpty(parameters)) {
            throw new Error('Parameters is required');
        }

        const paramsToFetch = [];

        // Load cached params
        parameters.forEach(({name, path}) => {
            if (_.isEmpty(name) || _.isEmpty(path)) {
                throw new Error(`Invalid parameter: ` + JSON.stringify({name, path}));
            }

            // Pre-populate the cache with any existing env vars
            if (this.useCache && (process.env[name] !== undefined)) {
                cache[name] = process.env[name];
            }

            if (process.env[name] === undefined) {
                if (this.useCache && (cache[name] !== undefined)) {
                    process.env[name] = cache[name];
                }
                else {
                    paramsToFetch.push(path);
                }
            }
        });

        // Load remaining params from aws in a single call
        if (!_.isEmpty(paramsToFetch)) {
            console.log(`${ParameterStoreService.name}::load`, {paramsToFetch});

            const result = await this.ssm.getParameters({
                Names          : paramsToFetch,
                WithDecryption : true
            }).promise();

            console.log(`${ParameterStoreService.name}::load`, {result});

            if (_.isEmpty(_.get(result, 'Parameters', []))) {
                // Failed to fetch all parameters
                console.error(`${ParameterStoreService.name}::load - failed to fetch all`);
                throw new Error('Failed to fetch all ssm parameters');
            }

            const {InvalidParameters, Parameters} = result;
            if (!_.isEmpty(InvalidParameters)) {
                // Failed to fetch some parameters
                console.error(`${ParameterStoreService.name}::load - failed to fetch`, {InvalidParameters});
                throw new Error('Failed to fetch some ssm parameters');
            }

            Parameters.forEach(({Name, Value}) => {
                const param = parameters.find((p) => p.path === Name);
                if (!_.isEmpty(param)) {
                    const name        = param.name;
                    cache[name]       = Value;
                    process.env[name] = Value;
                }
            });
        }
    }

    static middleware(parameters, useCache) {
        return (req, res, next) => new ParameterStoreService({parameters, useCache})
            .load()
            .then(() => next())
            .catch(error => {
                res.status(500).json({
                    errors : [
                        {
                            status : 500,
                            title  : 'ParameterConfigurationError',
                            detail : error.message
                        }
                    ]
                });
            })
            ;
    }
}
