# Tinder Client

[![npm](https://img.shields.io/npm/dt/tinder-client.svg)](https://www.npmjs.com/package/tinder-client)
[![npm](https://img.shields.io/npm/v/tinder-client.svg)](https://www.npmjs.com/package/tinder-client)

- [Tinder Client](#tinder-client)
  - [Introduction](#introduction)
  - [Dependencies](#dependencies)
  - [API](#api)
    - [Creating a client](#creating-a-client)
      - [`createClientFromFacebookAccessToken`](#createclientfromfacebookaccesstoken)
      - [`createClientFromFacebookLogin`](#createclientfromfacebooklogin)
    - [`getProfile`](#getprofile)
    - [`updateProfile`](#updateprofile)
    - [`getRecommendations`](#getrecommendations)
    - [`getUser`](#getuser)
    - [`getMetadata`](#getmetadata)
    - [`changeLocation`](#changelocation)
    - [`like`](#like)
    - [`pass`](#pass)
    - [`superLike`](#superlike)
    - [`getUpdates`](#getupdates)
    - [`messageMatch`](#messagematch)
    - [`getMatch`](#getmatch)
    - [`getMessage`](#getmessage)
    - [`getCommonConnections`](#getcommonconnections)
    - [`resetTemporaryLocation`](#resettemporarylocation)
    - [`temporarilyChangeLocation`](#temporarilychangelocation)
  - [Local Development](#local-development)
    - [Git Hooks](#git-hooks)
    - [Commit Linting](#commit-linting)
    - [Retrieving Facebook User ID and Facebook Access Token](#retrieving-facebook-user-id-and-facebook-access-token)

## Introduction

Tinder has an unofficial API that has been documented by [this gist](https://gist.github.com/rtt/10403467) and [`fbessez/Tinder`](https://github.com/fbessez/Tinder).

There is also an existing Node Client, [`tinderjs`](https://www.npmjs.com/package/tinderjs). This is a `Promise`-based equivalent.

## Dependencies

`tinder-client` has two dependencies:

- [`axios`](https://github.com/axios/axios) (`^0.18.0`)
- [`tinder-access-token-generator`](https://github.com/jaebradley/tinder-access-token-generator) (`^2.0.0`) - this is used to generate Tinder API access tokens

## API

### Creating a client

There are two ways to create a client

- If you have access to a user's Facebook access token, then you can use the `createClientFromFacebookAccessToken` factory function
- If you have access to a user's Facebook email & password, then you can use the `createClientFromFacebookLogin` factory function

The returned client object will have a variety of methods that will provide access to the Tinder API.

#### `createClientFromFacebookAccessToken`

```javascript
import { createClientFromFacebookAccessToken } from 'tinder-client';

const client = await createClientFromFacebookLogin('some facebook access token');
```

#### `createClientFromFacebookLogin`

```javascript
import { createClientFromFacebookLogin } from 'tinder-client';

const client = await createClientFromFacebookLogin({
  emailAddress: 'your facebook email address',
  password: 'your facebook password',
});
```

### `getProfile`

```javascript
const profile = await client.getProfile();
```

### `updateProfile`

```javascript
import { GENDERS, GENDER_SEARCH_OPTIONS } from 'tinder-client';

const userGender = GENDERS.female;
const searchPreferences = {
  maximumAge: 100,
  minimumAge: 99,
  genderPreference: GENDER_SEARCH_OPTIONS.both,
  maximumRangeInKilometers: 100,
};
const profile = await client.updateProfile({ userGender, searchPreferences })
```

### `getRecommendations`

```javascript
const recommendations = await client.getRecommendations();
```

### `getUser`

```javascript
const user = await client.getUser('someUserId');
```

### `getMetadata`

Get metadata for authenticated user

```javascript
const myMetadata = await client.getMetadata();
```

### `changeLocation`

```javascript
await client.changeLocation({ latitude: 'someLatitude', longitude: 'someLongitude' });
```

### `like`

```javascript
await client.like('someUserId');
```

### `pass`

```javascript
await client.pass('someUserId');
```

### `superLike`

```javascript
await client.superLike('someUserId');
```

### `getUpdates`

```javascript
await client.getUpdates();
await client.getUpdates('2019-02-05T00:00:00.004Z');
```

### `messageMatch`

```javascript
await client.messageMatch({ matchId: 'someMatch', message: 'someMessage' });
```

### `getMatch`

```javascript
await client.getMatch('someMatchId');
```

### `getMessage`

```javascript
await client.getMessage('someMessageId');
```

### `getCommonConnections`

```javascript
await client.getCommonConnections('someTinderUserId');
```

### `resetTemporaryLocation`

```javascript
await client.resetTemporaryLocation();
```

### `temporarilyChangeLocation`

```javascript
await client.temporarilyChangeLocation({ latitude: 'someLatitude', longitude: 'someLongitude' });
```

## Local Development

After cloning the repository, use `nvm` / `npm` to install dependencies.

To run both all tests, execute `npm run test`.

To only run unit tests, execute `npm run unit-test`.

To only run integration tests, execute `npm run integration-test`.

In order to execute local integration tests successfully, you'll need to specify the following environment variables in the `.env` file

- `FACEBOOK_EMAIL_ADDRESS`
- `FACEBOOK_PASSWORD`
- `TINDER_USER_ID` (Your Tinder user id)

To build the production bundle, execute `npm run build`.

### Git Hooks

This project uses [`husky`](https://github.com/typicode/husky) to maintain git hooks.

- `pre-commit` - run `eslint`
- `commit-msg` - run commit message linting
- `pre-push` - run unit tests

### Commit Linting

This project uses [`semantic-release`](https://github.com/semantic-release/semantic-release) and [`commitlint`](https://github.com/conventional-changelog/commitlint) (specifically the [Angular commit convention](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)) to automatically enforce semantic versioning.

### Retrieving Facebook User ID and Facebook Access Token

For local development, you might want to test the client out at on an ad-hoc basis or maybe even for integration testing.

In order to do so, you'll need to get your Facebook Access Token.

To retrieve a Facebook Access Token, you'll need to

- Go to [this URL](https://www.facebook.com/v2.8/dialog/oauth?app_id=464891386855067&channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2Fd_vbiawPdxB.js%3Fversion%3D44%23cb%3Df213b0a5a606e94%26domain%3Dtinder.com%26origin%3Dhttps%253A%252F%252Ftinder.com%252Ff14b12c5d35c01c%26relation%3Dopener&client_id=464891386855067&display=popup&domain=tinder.com&e2e=%7B%7D&fallback_redirect_uri=200ee73f-9eb7-9632-4fdb-432ed0c670fa&locale=en_US&origin=1&redirect_uri=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2Fd_vbiawPdxB.js%3Fversion%3D44%23cb%3Df20cfec000032b4%26domain%3Dtinder.com%26origin%3Dhttps%253A%252F%252Ftinder.com%252Ff14b12c5d35c01c%26relation%3Dopener%26frame%3Df2cc4d71cc96f9&response_type=token%2Csigned_request&scope=user_birthday%2Cuser_photos%2Cemail%2Cuser_friends%2Cuser_likes&sdk=joey&version=v2.8&ret=login)
- Open the `Network` tab
- Look for a request to `/confirm`

![confirm-request](https://user-images.githubusercontent.com/8136030/52327616-93f08e00-29a1-11e9-8438-3174ad663f17.png)

- Look at the response, specifically the `for.jsmods.require[3][0]` value, and search the text for `access_token`

![confirm-request-response](https://user-images.githubusercontent.com/8136030/52327797-2e50d180-29a2-11e9-90b3-d801816290b9.png)
