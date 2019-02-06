# Tinder Client

[![Greenkeeper badge](https://badges.greenkeeper.io/jaebradley/tinder-client.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/jaebradley/tinder-client.svg?branch=master)](https://travis-ci.org/jaebradley/tinder-client)
[![npm](https://img.shields.io/npm/dt/tinder-client.svg)](https://www.npmjs.com/package/tinder-client)
[![npm](https://img.shields.io/npm/v/tinder-client.svg)](https://www.npmjs.com/package/tinder-client)

* [Introduction](#introduction)
* [Dependencies](#dependencies)
* [API](#api)
  * [Create a client](#create-a-client)
  * [`getProfile`](#getprofile)
  * [`updateProfile`](#updateprofile)
  * [`getRecommendations`](#getrecommendations)
  * [`getUser`](#getuser)
  * [`getMetadata`](#getmetadata)
  * [`changeLocation`](#changelocation)
  * [`like`](#like)
  * [`pass`](#pass)
  * [`superLike`](#superlike)
  * [`getUpdates`](#getupdates)
  * [`messageMatch`](#messagematch)
  * [`getMatch`](#getmatch)
  * [`getMessage`](#getmessage)
  * [`resetTemporaryLocation`](#resettemporarylocation)
  * [`temporarilyChangeLocation`](#temporarilychangelocation)

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

### `resetTemporaryLocation`

```javascript
await client.resetTemporaryLocation();
```

### `temporarilyChangeLocation`

```javascript
await client.temporarilyChangeLocation({ latitude: 'someLatitude', longitude: 'someLongitude' });
```
