// ref: https://github.com/contentful/react-starter/tree/main/contentful
// ref: https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/

import 'dotenv/config';
import {default as runContentfulImport} from 'contentful-import';

const requiredEnv = [
    'CONTENTFUL_SPACE_ID',
    'CONTENTFUL_MANAGEMENT_TOKEN'
];
const isValid     = requiredEnv.reduce((o, v) => o && !!v, true);
if (!isValid) {
    throw new Error(
        [
            'Parameters missing...',
            'Please ensure your .env file exists and contains the variables: ' + requiredEnv.join(',')
        ].join('\n')
    );
}

const environmentId = process.env.CONTENTFUL_ENVIRONMENT || 'master';
const contentFilePath = process.env.CONTENTFUL_DEFAULT_CONTENT_PATH;

runContentfulImport({
    environmentId,
    errorLogFile : `./contentful/setup/export-${environmentId}-error.log`,
    contentFile     : contentFilePath,
    spaceId         : process.env.CONTENTFUL_SPACE_ID,
    managementToken : process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    uploadAssets    : true

    // -- Default options
    // skipContentModel: boolean; // false
    // skipLocales: boolean; // false
    // skipContentPublishing: boolean; // false
    // useVerboseRenderer: boolean; // false
    // rawProxy: boolean; // false
    // rateLimit: number; // 7

    // -- Other options
    // contentModelOnly?: boolean;
    // content?: string;
    // headers?: string[];
    // managementApplication?: string;
    // managementFeature?: string;
    // proxy?: string;
})
    .then(() => console.log('The content model of your space is successfully set up!'))
    .catch((e) => console.error(e))
;
