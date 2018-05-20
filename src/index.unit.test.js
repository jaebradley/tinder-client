import {
  mockPost,
  mockCreate,
  mockInstanceMethod,
  clientResponseData,
} from 'axios';
import { TinderClient } from './index';

jest.mock('axios');

describe('Unit tests', () => {
  const facebookUserId = 'facebookUserId';
  const facebookToken = 'facebookToken';

  describe('static constructor', () => {
    it('generates client from static constructor', async () => {
      const client = await TinderClient.create({ facebookUserId, facebookToken });
      expect(client).toBeDefined();
      expect(mockPost).toHaveBeenCalledTimes(1);
      expect(mockPost).toHaveBeenCalledWith(
        'https://api.gotinder.com/auth',
        {
          facebook_id: facebookUserId,
          facebook_token: facebookToken,
        },
      );
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(mockCreate).toHaveBeenCalledWith({
        baseURL: 'https://api.gotinder.com',
        headers: {
          'X-Auth-Token': 'token',
          'Content-Type': 'application/json',
          'User-Agent': 'Tinder Android Version 2.2.3',
          os_version: '16',
        },
      });
      expect(client).toBeInstanceOf(TinderClient);
    });
  });

  describe('client methods', () => {
    let client;

    beforeEach(async () => {
      client = await TinderClient.create({ facebookUserId, facebookToken });
    });

    afterEach(() => {
      mockPost.mockClear();
      mockCreate.mockClear();
      mockInstanceMethod.mockClear();
    });

    describe('getProfile', () => {
      it('gets profile', async () => {
        const profile = await client.getProfile();
        expect(mockInstanceMethod).toHaveBeenCalledTimes(1);
        expect(mockInstanceMethod).toHaveBeenCalledWith({
          method: 'get',
          url: '/profile',
        });
        expect(profile).toBeDefined();
        expect(profile).toBe(clientResponseData);
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
        expect(mockInstanceMethod).toHaveBeenCalledTimes(1);
        expect(mockInstanceMethod).toHaveBeenCalledWith({
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
        expect(response).toBe(clientResponseData);
      });
    });

    describe('getRecommendations', () => {
      it('gets recommendations', async () => {
        const recommendations = await client.getRecommendations();
        expect(mockInstanceMethod).toHaveBeenCalledTimes(1);
        expect(mockInstanceMethod).toHaveBeenCalledWith({
          method: 'get',
          url: '/user/recs',
        });
        expect(recommendations).toBe(clientResponseData);
      });
    });

    describe('getUser', () => {
      it('gets user data', async () => {
        const userId = 'userId';
        const userData = await client.getUser(userId);
        expect(mockInstanceMethod).toHaveBeenCalledTimes(1);
        expect(mockInstanceMethod).toHaveBeenCalledWith({
          method: 'get',
          url: '/user/userId',
        });
        expect(userData).toBe(clientResponseData);
      });
    });

    describe('getMetadata', () => {
      it('gets metadata', async () => {
        const metadata = await client.getMetadata();
        expect(mockInstanceMethod).toHaveBeenCalledTimes(1);
        expect(mockInstanceMethod).toHaveBeenCalledWith({
          method: 'get',
          url: '/meta',
        });
        expect(metadata).toBe(clientResponseData);
      });
    });

    describe('changeLocation', () => {
      it('changes location', async () => {
        const latitude = 'latitude';
        const longitude = 'longitude';
        const response = await client.changeLocation({ latitude, longitude });
        expect(mockInstanceMethod).toHaveBeenCalledTimes(1);
        expect(mockInstanceMethod).toHaveBeenCalledWith({
          method: 'post',
          url: '/user/ping',
          data: { lat: latitude, lon: longitude },
        });
        expect(response).toBe(clientResponseData);
      });
    });

    describe('like', () => {
      it('likes user', async () => {
        const userId = 'userId';
        const response = await client.like(userId);
        expect(mockInstanceMethod).toHaveBeenCalledTimes(1);
        expect(mockInstanceMethod).toHaveBeenCalledWith({
          method: 'get',
          url: `/like/${userId}`,
        });
        expect(response).toBe(clientResponseData);
      });
    });

    describe('pass', () => {
      it('passes on user', async () => {
        const userId = 'userId';
        const response = await client.pass(userId);
        expect(mockInstanceMethod).toHaveBeenCalledTimes(1);
        expect(mockInstanceMethod).toHaveBeenCalledWith({
          method: 'get',
          url: `/pass/${userId}`,
        });
        expect(response).toBe(clientResponseData);
      });
    });

    describe('superLike', () => {
      it('super likes a user', async () => {
        const userId = 'userId';
        const response = await client.superLike(userId);
        expect(mockInstanceMethod).toHaveBeenCalledTimes(1);
        expect(mockInstanceMethod).toHaveBeenCalledWith({
          method: 'get',
          url: `/like/${userId}/super`,
        });
        expect(response).toBe(clientResponseData);
      });
    });

    describe('messageMatch', () => {
      it('messages a match', async () => {
        const matchId = 'matchId';
        const message = 'message';
        const response = await client.messageMatch({ matchId, message });
        expect(mockInstanceMethod).toHaveBeenCalledTimes(1);
        expect(mockInstanceMethod).toHaveBeenCalledWith({
          method: 'post',
          url: `/user/matches/${matchId}`,
          data: { message },
        });
        expect(response).toBe(clientResponseData);
      });
    });

    describe('getMatch', () => {
      it('gets data for a match', async () => {
        const matchId = 'matchId';
        const response = await client.getMatch(matchId);
        expect(mockInstanceMethod).toHaveBeenCalledTimes(1);
        expect(mockInstanceMethod).toHaveBeenCalledWith({
          method: 'get',
          url: `/matches/${matchId}`,
        });
        expect(response).toBe(clientResponseData);
      });
    });

    describe('getMessage', () => {
      it('gets data for a message', async () => {
        const messageId = 'messageId';
        const response = await client.getMessage(messageId);
        expect(mockInstanceMethod).toHaveBeenCalledTimes(1);
        expect(mockInstanceMethod).toHaveBeenCalledWith({
          method: 'get',
          url: `/message/${messageId}`,
        });
        expect(response).toBe(clientResponseData);
      });
    });

    describe('resetTemporaryLocation', () => {
      it('resets temporary location', async () => {
        const response = await client.resetTemporaryLocation();
        expect(mockInstanceMethod).toHaveBeenCalledTimes(1);
        expect(mockInstanceMethod).toHaveBeenCalledWith({
          method: 'post',
          url: '/passport/user/reset',
        });
        expect(response).toBe(clientResponseData);
      });
    });

    describe('temporarilyChangeLocation', () => {
      it('temporarily changes location', async () => {
        const latitude = 'latitude';
        const longitude = 'longitude';
        const response = await client.temporarilyChangeLocation({ latitude, longitude });
        expect(mockInstanceMethod).toHaveBeenCalledTimes(1);
        expect(mockInstanceMethod).toHaveBeenCalledWith({
          method: 'post',
          url: '/passport/user/travel',
          data: { lat: latitude, lon: longitude },
        });
        expect(response).toBe(clientResponseData);
      });
    });
  });
});
