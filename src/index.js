import axios from 'axios';
import generateToken from 'tinder-access-token-generator';

import createHTTPClient from './createHTTPClient';

/**
 * https://github.com/fbessez/Tinder
 * https://gist.github.com/rtt/10403467
*/

const GENDERS = Object.freeze({
  male: 0,
  female: 1,
});

const GENDER_SEARCH_OPTIONS = Object.freeze({
  male: 0,
  female: 1,
  both: -1,
});

async function createClientFromFacebookAccessToken(facebookAccessToken) {
  const loginResponse = await axios.post(
    'https://api.gotinder.com/v2/auth/login/facebook',
    {
      token: facebookAccessToken,
    },
  );
  return createHTTPClient(loginResponse.data.data.api_token);
}

async function createClientFromFacebookLogin({ emailAddress, password }) {
  const {
    apiToken,
  } = await generateToken({
    facebookEmailAddress: emailAddress,
    facebookPassword: password,
  });

  return createHTTPClient(apiToken);
}

export {
  createClientFromFacebookAccessToken,
  createClientFromFacebookLogin,
  GENDERS,
  GENDER_SEARCH_OPTIONS,
};
