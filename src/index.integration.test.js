import axios from 'axios';
import dotenv from 'dotenv';
import { TinderClient } from './index';

jest.setTimeout(15000);

dotenv.config();

describe('TinderClient', () => {
  let client;

  beforeAll(async () => {
    const actualAxios = require.requireActual('axios');
    axios.post.mockImplementation(actualAxios.post);
    axios.create.mockImplementation(actualAxios.create);
    axios.get.mockImplementation(actualAxios.get);
    client = await TinderClient.createFromFacebookLogin({
      emailAddress: process.env.FACEBOOK_EMAIL_ADDRESS,
      password: process.env.FACEBOOK_PASSWORD,
    });
  });

  afterAll(() => {
    client = null;
  });

  describe('Integration tests', () => {
    describe('Constructor', () => {
      it('should fail to construct client', () => {
        try {
          TinderClient();
        } catch (e) {
          // expected
        }
      });
    });

    describe('Profile', () => {
      it('should fetch profile', async () => {
        const response = await client.getProfile();
        expect(response).toBeDefined();
      });
    });

    describe('Recommendations', () => {
      it('should fetch recommendations', async () => {
        const response = await client.getRecommendations();
        expect(response).toBeDefined();
      });
    });

    describe('User', () => {
      it('should fetch user', async () => {
        const response = await client.getUser(process.env.TEST_USER_ID);
        expect(response).toBeDefined();
      });
    });

    describe('Metadata', () => {
      it('should fetch metadata', async () => {
        const response = await client.getMetadata();
        expect(response).toBeDefined();
      });
    });

    xdescribe('#like', () => {
      it('likes recommendation', async () => {
        const recommendations = await client.getRecommendations();
        // eslint-disable-next-line no-underscore-dangle
        const firstRecommendationUserId = recommendations[0]._id;
        const response = await client.like(firstRecommendationUserId);
        expect(response).toBeDefined();
      });
    });

    xdescribe('#pass', () => {
      it('passes on recommendation', async () => {
        const recommendations = await client.getRecommendations();
        // eslint-disable-next-line no-underscore-dangle
        const firstRecommendationUserId = recommendations[0]._id;
        const response = await client.pass(firstRecommendationUserId);
        expect(response).toBeDefined();
      });
    });

    describe('#temporarilyChangeLocation', () => {
      it('temporarily changes location', async () => {
        const response = await client.changeLocation({ latitude: 42.3601, longitude: 71.0589 });
        expect(response).toBeDefined();
      });
    });

    describe('#getUpdates', () => {
      describe('when timestamp is defined', async () => {
        it('gets updates', async () => {
          const response = await client.getUpdates('2017-03-25T20:58:00.404Z');
          expect(response).toBeDefined();
        });
      });

      describe('when timestamp is not defined', async () => {
        it('gets updates', async () => {
          const response = await client.getUpdates();
          expect(response).toBeDefined();
        });
      });
    });
  });
});
