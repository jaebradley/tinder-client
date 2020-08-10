import axios from 'axios';

/**
 * https://github.com/fbessez/Tinder
 * https://gist.github.com/rtt/10403467
*/

// Headers from https://github.com/fbessez/Tinder/blob/8bf8612e93702844b640fb2d79b2918238d376e9/tinder_api.py#L7-L13
const SHARED_HEADERS = Object.freeze({
  app_version: '6.9.4',
  platform: 'ios',
  'User-Agent': 'Tinder/7.5.3 (iPhone; iOS 10.3.2; Scale/2.00)',
  Accept: 'application/json',
});

export default function createHTTPClient(accessToken) {
  const client = axios.create({
    baseURL: 'https://api.gotinder.com',
    headers: {
      'X-Auth-Token': accessToken,
      ...SHARED_HEADERS,
    },
  });
  return {
    getProfile() {
      return client.get('/profile').then(response => response.data);
    },

    updateProfile({ userGender, searchPreferences }) {
      const {
        maximumAge,
        minimumAge,
        genderPreference,
        bio,
        maximumRangeInKilometers,
      } = searchPreferences;

      return client.post(
        '/profile',
        {
          age_filter_min: minimumAge,
          age_filter_max: maximumAge,
          gender_filter: genderPreference,
          gender: userGender,
          bio: bio,
          distance_filter: maximumRangeInKilometers,
        },
      ).then(response => response.data);
    },

    getRecommendations() {
      return client.get('/user/recs').then(response => response.data);
    },

    getUser(userId) {
      return client.get(`/user/${userId}`).then(response => response.data);
    },

    getMetadata() {
      return client.get('/meta').then(response => response.data);
    },

    changeLocation({ latitude, longitude }) {
      return client
        .post('/user/ping', { lat: latitude, lon: longitude })
        .then(response => response.data);
    },

    like(userId) {
      return client.get(`/like/${userId}`).then(response => response.data);
    },

    pass(userId) {
      return client.get(`/pass/${userId}`).then(response => response.data);
    },

    superLike(userId) {
      return client.post(`/like/${userId}/super`).then(response => response.data);
    },

    messageMatch({ matchId, message }) {
      return client.post(`/user/matches/${matchId}`, { message }).then(response => response.data);
    },

    getMatch(matchId) {
      return client.get(`/matches/${matchId}`).then(response => response.data);
    },

    getMessage(messageId) {
      return client.get(`/message/${messageId}`).then(response => response.data);
    },

    getCommonConnections(userId) {
      return client.get(`/user/${userId}/common_connections`).then(response => response.data);
    },

    getUpdates(sinceTimestamp = '') {
      return client
        .post('/updates', { last_activity_date: sinceTimestamp })
        .then(response => response.data);
    },

    resetTemporaryLocation() {
      return client.post('/passport/user/reset').then(response => response.data);
    },

    temporarilyChangeLocation({ latitude, longitude }) {
      return client.post(
        '/passport/user/travel',
        {
          lat: latitude,
          lon: longitude,
        },
      ).then(response => response.data);
    },

    unmatch(matchId) {
      return client.delete(`/user/matches/${matchId}`).then(response => response.data);
    },
  };
}
