# Tinder Client

[![Greenkeeper badge](https://badges.greenkeeper.io/jaebradley/tinder-client.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/jaebradley/tinder-client.svg?branch=master)](https://travis-ci.org/jaebradley/tinder-client)
[![npm](https://img.shields.io/npm/dt/tinder-client.svg)](https://www.npmjs.com/package/tinder-client)
[![npm](https://img.shields.io/npm/v/tinder-client.svg)](https://www.npmjs.com/package/tinder-client)

- [Tinder Client](#tinder-client)
  - [Introduction](#introduction)
  - [Dependencies](#dependencies)
  - [API](#api)
    - [Create a client](#create-a-client)
    - [`getProfile`](#getprofile)
    - [`updateProfile`](#updateprofile)
    - [`getRecommendations`](#getrecommendations)
    - [`getUser`](#getuser)
    - [`getMetadata`](#getmetadata)
    - [`changeLocation`](#changelocation)
    - [`like`](#like)
    - [`pass`](#pass)
    - [`superLike`](#superlike)
    - [`messageMatch`](#messagematch)
    - [`getMatch`](#getmatch)
    - [`getMessage`](#getmessage)
    - [`resetTemporaryLocation`](#resettemporarylocation)
    - [`temporarilyChangeLocation`](#temporarilychangelocation)
  - [Local Development](#local-development)
    - [Commit Linting](#commit-linting)
    - [Retrieving Facebook User ID and Facebook Access Token](#retrieving-facebook-user-id-and-facebook-access-token)

## Introduction

Tinder has an unofficial API that has been documented by [this gist](https://gist.github.com/rtt/10403467) and [`fbessez/Tinder`](https://github.com/fbessez/Tinder).

There is also an existing Node Client, [`tinderjs`](https://www.npmjs.com/package/tinderjs). This is a `Promise`-based equivalent.

## Dependencies

`tinder-client` has one dependency: [`axios`](https://github.com/axios/axios) (`^0.18.0`). It **does not** come bundled with this package - it is defined as a `peerDependency` and you **will** need to install it separately.

## API

### Create a client

```javascript
import { TinderClient } from 'tinder-client';

const facebookUserId = 'someFacebookUserId';
const facebookToken = 'someFacebookToken';
const client = await TinderClient.create({ facebookUserId, facebookToken });
```

### `getProfile`

```javascript
const profile = await client.getProfile();
```

### `updateProfile`

```javascript
import { GENDERS, GENDER_SEARCH_OPTIONS, TinderClient } from 'tinder-client';

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

To run tests, execute `npm run test`.

To build the production bundle, execute `npm run build`.

### Commit Linting

This project uses [`semantic-release`](https://github.com/semantic-release/semantic-release) and [`commitlint`](https://github.com/conventional-changelog/commitlint) (specifically the [Angular commit convention](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)) to automatically enforce semantic versioning.

### Retrieving Facebook User ID and Facebook Access Token

For local development, you might want to test the client out at on an ad-hoc basis or maybe even for integration testing.

In order to do so, you'll need to get your Facebook User ID and a Facebook Access Token.

To get the Facebook User ID manually, you can go to the [Graph API Explorer](https://developers.facebook.com/tools/explorer).

To retrieve a Facebook Access Token, you'll need to

- Go to [this URL](https://www.facebook.com/v2.6/dialog/oauth?redirect_uri=fb464891386855067%3A%2F%2Fauthorize%2F&display=touch&state=%7B%22challenge%22%3A%22IUUkEUqIGud332lfu%252BMJhxL4Wlc%253D%22%2C%220_auth_logger_id%22%3A%2230F06532-A1B9-4B10-BB28-B29956C71AB1%22%2C%22com.facebook.sdk_client_state%22%3Atrue%2C%223_method%22%3A%22sfvc_auth%22%7D&scope=user_birthday%2Cuser_photos%2Cuser_education_history%2Cemail%2Cuser_relationship_details%2Cuser_friends%2Cuser_work_history%2Cuser_likes&response_type=token%2Csigned_request&default_audience=friends&return_scopes=true&auth_type=rerequest&client_id=464891386855067&ret=login&sdk=ios&logger_id=30F06532-A1B9-4B10-BB28-B29956C71AB1&ext=1470840777&hash=AeZqkIcf-NEW6vBd)
- Open the `Network` tab
- Look for a request to `/confirm`

![confirm-request](https://user-images.githubusercontent.com/8136030/52327616-93f08e00-29a1-11e9-8438-3174ad663f17.png)

- Look at the response, specifically the `for.jsmods.require[3][0]` value, and search the text for `access_token`

![confirm-request-response](https://user-images.githubusercontent.com/8136030/52327797-2e50d180-29a2-11e9-90b3-d801816290b9.png)
