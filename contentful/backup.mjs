// ref: https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/

import 'dotenv/config';
import runContentfulExport from 'contentful-export';

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

runContentfulExport({
    environmentId,
    errorLogFile    : `./contentful/backup/${environmentId}-error.log`,
    exportDir       : `./contentful/backup/${environmentId}`,
    spaceId         : process.env.CONTENTFUL_SPACE_ID,
    managementToken : process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    downloadAssets  : true,
    includeArchived : false, // TODO: review this...
    includeDrafts   : true

    // contentFile?: string;
    // contentOnly?: boolean;
    // headers?: string[];
    // host?: string;
    // limit?: number;
    // managementApplication?: string;
    // managementFeature?: string;
    // maxAllowedLimit?: number;
    // proxy?: string;
    // queryEntries?: string[];
    // queryAssets?: string[];
    // rawProxy?: boolean;
    // saveFile?: boolean;
    // skipContent?: boolean;
    // skipContentModel?: boolean;
    // skipEditorInterfaces?: boolean;
    // skipRoles?: boolean;
    // skipWebhooks?: boolean;
    // useVerboseRenderer?: boolean;
})
    .then(() => console.log('The content model of your space is successfully backed up!'))
    .catch((e) => console.error(e))
;
