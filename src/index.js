import axios from 'axios';

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

class TinderClient {
  constructor(client) {
    if (!client) {
      throw new Error('Call create method');
    }

    this.client = client;
  }

  static async create({ facebookUserId, facebookToken }) {
    const tinderAuthResponse = await axios.post('https://api.gotinder.com/auth', {
      facebook_id: facebookUserId,
      facebook_token: facebookToken,
    });
    const tinderAuthToken = tinderAuthResponse.data.token;
    const client = await axios.create({
      baseURL: 'https://api.gotinder.com',
      headers: {
        'X-Auth-Token': tinderAuthToken,
        'Content-Type': 'application/json',
        'User-Agent': 'Tinder Android Version 2.2.3',
        os_version: '16',
      },
    });
    return new TinderClient(client);
  }

  async getProfile() {
    return this.client({
      method: 'get',
      url: '/profile',
    }).then(response => response.data);
  }

  async updateProfile({ userGender, searchPreferences }) {
    const {
      maximumAge,
      minimumAge,
      genderPreference,
      maximumRangeInKilometers,
    } = searchPreferences;

    return this.client({
      method: 'post',
      url: '/profile',
      data: {
        age_filter_min: minimumAge,
        age_filter_max: maximumAge,
        gender_filter: genderPreference,
        gender: userGender,
        distance_filter: maximumRangeInKilometers,
      },
    });
  }

  async getRecommendations() {
    return this.client({
      method: 'get',
      url: '/user/recs',
    }).then(response => response.data);
  }

  async getUser(userId) {
    return this.client({
      method: 'get',
      url: `/user/${userId}`,
    }).then(response => response.data);
  }

  async getMetadata() {
    return this.client({
      method: 'get',
      url: '/meta',
    }).then(response => response.data);
  }

  async changeLocation({ latitude, longitude }) {
    return this.client({
      method: 'post',
      url: '/user/ping',
      data: { lat: latitude, lon: longitude },
    }).then(response => response.data);
  }

  async like(userId) {
    return this.client({
      method: 'get',
      url: `/like/${userId}`,
    }).then(response => response.data);
  }

  async pass(userId) {
    return this.client({
      method: 'get',
      url: `/pass/${userId}`,
    }).then(response => response.data);
  }

  async superLike(userId) {
    return this.client({
      method: 'get',
      url: `/like/${userId}/super`,
    }).then(response => response.data);
  }

  async messageMatch({ matchId, message }) {
    return this.client({
      method: 'post',
      url: `/user/matches/${matchId}`,
      data: { message },
    }).then(response => response.data);
  }

  async getMatch(matchId) {
    return this.client({
      method: 'get',
      url: `matches/${matchId}`,
    }).then(response => response.data);
  }

  async getMessage(messageId) {
    return this.client({
      method: 'get',
      url: `/message/${messageId}`,
    }).then(response => response.data);
  }

  async resetTemporaryLocation() {
    return this.client({
      method: 'post',
      url: '/passport/user/reset',
    }).then(response => response.data);
  }

  async temporarilyChangeLocation({ latitude, longitude }) {
    return this.client({
      method: 'post',
      url: '/passport/user/travel',
      data: {
        lat: latitude,
        lon: longitude,
      },
    }).then(response => response.data);
  }
}

export { TinderClient, GENDERS, GENDER_SEARCH_OPTIONS };
