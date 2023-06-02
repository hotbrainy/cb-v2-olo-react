# Contentful (CMS)

## Configure Contentful

- Create a local copy of the contentful config template files.
  - NOTE: these contain sensitive credentials and must not be committed to source control.
  - `cp ./contentful/backup-config-TEMPLATE.json ./contentful/backup-config.json`
  - `cp ./contentful/restore-config-TEMPLATE.json ./contentful/restore-config.json`

Obtain a Personal Access Token from Contentful.
PATs are used to authorise management of the Contentful Space using the Contentful API/CLI.

- [Generate Personal Token](https://app.contentful.com/account/profile/cma_tokens)
- Press the `Generate personal token` button
- Provide a meaningful `Token name`
- Press the `Generate` button
- Copy the Personal Access Token
- Assign it to the `CONTENTFUL_MANAGEMENT_TOKEN` config option in `.env`

<hr>

## Install Contentful CLI

- Ensure the Contentful CLI is installed globally on the pc
    - `npm install -g contentful-cli`

<hr>

## Backup An Existing Contentful Environment

- Edit the file `contentful/backup-config.json`
  - **spaceId** - the Contentful space id of the account containing the data to be backed up
  - **environmentId** - the environment of the Contentful space containing the data to be backed up
  - **managementToken** - the auth token of the Contentful Admin User who has permission to access the Contentful Account
- Cleanup any existing backup data and logs
  - `npm run contentful:clean`
- Backup the existing Contentful data
  - `npm run contentful:backup`

<hr>

## Restore An Existing Contentful Backup

- Edit the file `contentful/restore-config.json`
    - **spaceId** - the Contentful space id of the account that will import the backed up data
    - **environmentId** - the environment of the Contentful space that will import the backed up data
    - **managementToken** - the auth token of the Contentful Admin User who has permission to access the Contentful Account
- Restore the existing Contentful backup
    - `npm run contentful:restore`

### NOTES:

- existing data will be over-written with the source data
- data can be transferred to a completely different Contentful Account if desired
- data can be transferred to a completely different Contentful Space if desired
- data can be transferred to a completely different Contentful Environment if desired

<hr>

## Migrate An Existing Contentful Space

- Backup the existing Contentful environment
- Edit the file `contentful/restore-config.json`
  - provide the details for a different account/space/environment
- Restore the existing Contentful backup

<hr>
