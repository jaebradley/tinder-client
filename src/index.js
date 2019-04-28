import axios from 'axios';
import generateAccessToken from 'tinder-access-token-generator';

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

// Headers from https://github.com/fbessez/Tinder/blob/8bf8612e93702844b640fb2d79b2918238d376e9/tinder_api.py#L7-L13
const SHARED_HEADERS = Object.freeze({
  app_version: '6.9.4',
  platform: 'ios',
  'User-Agent': 'Tinder/7.5.3 (iPhone; iOS 10.3.2; Scale/2.00)',
  Accept: 'application/json',
});

class TinderClient {
  constructor(client) {
    if (!client) {
      throw new Error('Call create method');
    }

    this.client = client;
  }

  static create({ facebookToken }) {
    return axios.post(
      'https://api.gotinder.com/v2/auth/login/facebook',
      {
        token: facebookToken,
      },
    ).then(response => axios.create({
      baseURL: 'https://api.gotinder.com',
      headers: {
        'X-Auth-Token': response.data.data.api_token,
        ...SHARED_HEADERS,
      },
    })).then(client => new TinderClient(client));
  }

  static createFromFacebookLogin({ emailAddress, password }) {
    return generateAccessToken({
      facebookEmailAddress: emailAddress,
      facebookPassword: password,
    }).then(({ apiToken }) => axios.create({
      baseURL: 'https://api.gotinder.com',
      headers: {
        'X-Auth-Token': apiToken,
        ...SHARED_HEADERS,
      },
    })).then(client => new TinderClient(client));
  }

  getProfile() {
    return this.client.get('/profile').then(response => response.data);
  }

  updateProfile({ userGender, searchPreferences }) {
    const {
      maximumAge,
      minimumAge,
      genderPreference,
      maximumRangeInKilometers,
    } = searchPreferences;

    return this.client.post(
      '/profile',
      {
        age_filter_min: minimumAge,
        age_filter_max: maximumAge,
        gender_filter: genderPreference,
        gender: userGender,
        distance_filter: maximumRangeInKilometers,
      },
    ).then(response => response.data);
  }

  getRecommendations() {
    return this.client.get('/user/recs').then(response => response.data);
  }

  getUser(userId) {
    return this.client.get(`/user/${userId}`).then(response => response.data);
  }

  getMetadata() {
    return this.client.get('/meta').then(response => response.data);
  }

  changeLocation({ latitude, longitude }) {
    return this.client
      .post('/user/ping', { lat: latitude, lon: longitude })
      .then(response => response.data);
  }

  like(userId) {
    return this.client.get(`/like/${userId}`).then(response => response.data);
  }

  pass(userId) {
    return this.client.get(`/pass/${userId}`).then(response => response.data);
  }

  superLike(userId) {
    return this.client.post(`/like/${userId}/super`).then(response => response.data);
  }

  messageMatch({ matchId, message }) {
    return this.client.post(`/user/matches/${matchId}`, { message }).then(response => response.data);
  }

  getMatch(matchId) {
    return this.client.get(`/matches/${matchId}`).then(response => response.data);
  }

  getMessage(messageId) {
    return this.client.get(`/message/${messageId}`).then(response => response.data);
  }

  getUpdates(sinceTimestamp = '') {
    return this.client
      .post('/updates', { last_activity_date: sinceTimestamp })
      .then(response => response.data);
  }

  resetTemporaryLocation() {
    return this.client.post('/passport/user/reset').then(response => response.data);
  }

  temporarilyChangeLocation({ latitude, longitude }) {
    return this.client.post(
      '/passport/user/travel',
      {
        lat: latitude,
        lon: longitude,
      },
    ).then(response => response.data);
  }
}

export {
  TinderClient,
  GENDERS,
  GENDER_SEARCH_OPTIONS,
};
