import axios from 'jest-mock-axios';
import { TinderClient } from './index';

describe('Unit tests', () => {
  const facebookUserId = 'facebookUserId';
  const facebookToken = 'facebookToken';

  beforeEach(() => {
    axios.post.mockImplementation(async (url) => {
      if (url === 'https://api.gotinder.com/auth') {
        return { data: { token: 'token' } };
      }
      return { data: 'default response' };
    });
  });
  axios.create.mockResolvedValue(axios);
  axios.get.mockResolvedValue({ data: 'default response' });

  afterEach(() => {
    axios.reset();
  });

  describe('static constructor', () => {
    it('generates client from static constructor', async () => {
      const client = await TinderClient.create({ facebookUserId, facebookToken });
      expect(client).toBeDefined();
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        'https://api.gotinder.com/auth',
        {
          facebook_id: facebookUserId,
          facebook_token: facebookToken,
        },
      );
      expect(axios.create).toHaveBeenCalledTimes(1);
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'https://api.gotinder.com',
        headers: {
          'X-Auth-Token': 'token',
          app_version: '6.9.4',
          platform: 'ios',
          'User-Agent': 'Tinder/7.5.3 (iPhone; iOS 10.3.2; Scale/2.00)',
          Accept: 'application/json',
        },
      });
      expect(client).toBeInstanceOf(TinderClient);
    });
  });

  describe('client methods', () => {
    let client;

    beforeEach(async () => {

    });

    describe('getProfile', () => {
      it('gets profile', async () => {
        client = await TinderClient.create({ facebookUserId, facebookToken });
        const profile = await client.getProfile();
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith('/profile');
        expect(profile).toBeDefined();
        expect(profile).toBe('default response');
      });
    });

    describe('updateProfile', () => {
      it('updates profile', async () => {
        const userGender = 'userGender';
        const maximumAge = 'maximumAge';
        const minimumAge = 'minimumAge';
        const genderPreference = 'genderPreference';
        const maximumRangeInKilometers = 'maximumRangeInKilometers';
        const searchPreferences = {
          maximumAge,
          minimumAge,
          genderPreference,
          maximumRangeInKilometers,
        };
        const response = await client.updateProfile({
          userGender,
          searchPreferences,
        });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
          '/profile',
          {
            age_filter_min: minimumAge,
            age_filter_max: maximumAge,
            gender_filter: genderPreference,
            gender: userGender,
            distance_filter: maximumRangeInKilometers,
          },
        );
        expect(response).toBe('default response');
      });
    });

    describe('getRecommendations', () => {
      it('gets recommendations', async () => {
        const recommendations = await client.getRecommendations();
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith('/user/recs');
        expect(recommendations).toBe('default response');
      });
    });

    describe('getUser', () => {
      it('gets user data', async () => {
        const userId = 'userId';
        const userData = await client.getUser(userId);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith('/user/userId');
        expect(userData).toBe('default response');
      });
    });

    describe('getMetadata', () => {
      it('gets metadata', async () => {
        const metadata = await client.getMetadata();
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith('/meta');
        expect(metadata).toBe('default response');
      });
    });

    describe('changeLocation', () => {
      it('changes location', async () => {
        const latitude = 'latitude';
        const longitude = 'longitude';
        const response = await client.changeLocation({ latitude, longitude });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
          '/user/ping',
          { lat: latitude, lon: longitude },
        );
        expect(response).toBe('default response');
      });
    });

    describe('like', () => {
      it('likes user', async () => {
        const userId = 'userId';
        const response = await client.like(userId);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`/like/${userId}`);
        expect(response).toBe('default response');
      });
    });

    describe('pass', () => {
      it('passes on user', async () => {
        const userId = 'userId';
        const response = await client.pass(userId);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`/pass/${userId}`);
        expect(response).toBe('default response');
      });
    });

    describe('superLike', () => {
      it('super likes a user', async () => {
        const userId = 'userId';
        const response = await client.superLike(userId);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`/like/${userId}/super`);
        expect(response).toBe('default response');
      });
    });

    describe('messageMatch', () => {
      it('messages a match', async () => {
        const matchId = 'matchId';
        const message = 'message';
        const response = await client.messageMatch({ matchId, message });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(`/user/matches/${matchId}`, { message });
        expect(response).toBe('default response');
      });
    });

    describe('getMatch', () => {
      it('gets data for a match', async () => {
        const matchId = 'matchId';
        const response = await client.getMatch(matchId);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`/matches/${matchId}`);
        expect(response).toBe('default response');
      });
    });

    describe('getMessage', () => {
      it('gets data for a message', async () => {
        const messageId = 'messageId';
        const response = await client.getMessage(messageId);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`/message/${messageId}`);
        expect(response).toBe('default response');
      });
    });

    describe('resetTemporaryLocation', () => {
      it('resets temporary location', async () => {
        const response = await client.resetTemporaryLocation();
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith('/passport/user/reset');
        expect(response).toBe('default response');
      });
    });

    describe('temporarilyChangeLocation', () => {
      it('temporarily changes location', async () => {
        const latitude = 'latitude';
        const longitude = 'longitude';
        const response = await client.temporarilyChangeLocation({ latitude, longitude });
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(
          '/passport/user/travel',
          { lat: latitude, lon: longitude },
        );
        expect(response).toBe('default response');
      });
    });
  });
});
