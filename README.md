# Tinder Client

## Introduction

Tinder has an unofficial API that has been documented by [this gist](https://gist.github.com/rtt/10403467) and [`fbessez/Tinder`](https://github.com/fbessez/Tinder).

There is also an existing Node Client, [`tinderjs`](https://www.npmjs.com/package/tinderjs). This is a `Promise`-based equivalent.

## API

### Create a client

```javascript
import { TinderClient } from 'tinder-client';

const facebookUserId = 'someFacebookUserId';
const facebookToken = 'someFacebookToken';
const client = await TinderClient.create({ facebookUserId, facebookToken });
const profile = await client.getProfile();
```
