# Development Environment

This purpose of this document is to provide instructions to configure the local development environment.

This application is an adaptation of [react-serverless-boilerplate](README.md).

<hr>

## Tools

Ensure the following tools are available in the dev environment:
- node.js 14.0+
- npm
- yarn

<hr>

## Project Setup

### Install npm Packages

- `yarn install`

<hr>

## Environment Variables

- Create a `.env` config file by copying `.env-TEMPLATE`
- Update the variables within the `.env` config file
- WARNING: 
  - never commit the `.env` file to git 
    - it contains sensitive information
  - ignoring `.env` is defined in the `.gitignore` file

<hr>

## Contentful

Contentful is a powerful CMS used to drive the customisable content of this website project.
This section assumes credentials have NOT been provided for an existing Contentful Space.

- [Sign-in](https://www.contentful.com) to the Contentful website.
- or [Create](https://www.contentful.com/sign-up/) a free account.

### Setup Contentful Environments

NOTE: you may need to do these from the `master` environment on the Contentful website.

```
Defining separate environments is not required, however, it will make
future dev/testing/deploying more maintainable if the environments are separated.

Simply use the default "master" environment to avoid creating multiple environments.
```

- Contentful website => Settings / Environments
  - Define the following environment names:
    - master (this is predefined by Contentful)
    - development
    - staging
    - production


### Upload Existing Content To A Contentful Space

#### Update `.env`

Obtain a Personal Access Token from Contentful.
PATs are used to authorise management of the Contentful Space using the Contentful API/CLI.

- [Generate Personal Token](https://app.contentful.com/account/profile/cma_tokens)
- Press the `Generate personal token` button
- Provide a meaningful `Token name`
- Press the `Generate` button
- Copy the Personal Access Token
- Assign it to the `CONTENTFUL_MANAGEMENT_TOKEN` config option in `.env`

#### Fetch the Contentful credentials

API Keys are used for read-only access to download content via the Contentful API.

- Contentful website => Settings / API keys
  - Create a new API Key
  - Select the environments the API Key will be applied to
  - Add the API tokens to the `.env` file


### Backup Existing Contentful Content

```
Recommendation: delete any existing local backup folder/s of
 the target environment/s before downloading a new backup from Content.

eg.
    yarn clean:contentful:backups.development
    
    OR
    
    yarn clean:contentful:backups
```

The target Contentful environment to be backed up is defined in `.env`.

`CONTENTFUL_ENVIRONMENT=`

Run the following npm/yarn scripts:
- `yarn clean:contentful:backups.development`
- `yarn backup:contentful`


### Upload Contentful Content

A new Contentful account will not have any content.
So the content can be seeded from the existing backup located at:
`/contentful/backup/development`

The target Contentful environment to be uploaded is defined in `.env`.
`CONTENTFUL_ENVIRONMENT=`

`yarn setup:contentful`


The path that contains the content to be uploaded to Contentful is defined in `.env`:
(Set this to the correct environment/filename path from the contentful/backup folder)

`CONTENTFUL_DEFAULT_CONTENT_PATH=`

```
TIP: you can copy content between Contentful environments:

eg. copying content from "development" to "staging"

1. Make a copy of the existing "development" backup folder
    - cp -pR ./contentful/backup/development/ ./contentful/backup/staging

2. Update the target Contentful environment
    - change the "CONTENTFUL_ENVIRONMENT=" to "staging"

3. Upload the local backup to the target Contentful environemnt
    - yarn setup:contentful
```

<hr>

#### TIP

Perform regular backups or make a backup after updating content on the Contentful website.


`https://github.com/GlassandCo/cb-olo-react/tree/develop`

- Checkout the `develop` branch
  - `git checkout develop`
- Install npm packages
  - `yarn`
- Configure `.env`
  - `cp .env-TEMPLATE .env`
  - Setup Contentful dev account and grab API keys
  - request api keys/urls for products/stores APIs



<hr>

# WARNING !!!

npm package `serverless-offline` is problematic and needs to be reviewed.

It can not currently be upgraded past version: `8.5.0`, otherwise the lambdas in `handler.ts` will not be executed 
and the website will not render. 
