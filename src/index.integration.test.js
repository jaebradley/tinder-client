import dotenv from 'dotenv';
import { TinderClient } from './index';

dotenv.config();

describe('TinderClient', () => {
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
        const client = await TinderClient.create({
          facebookUserId: process.env.FACEBOOK_USER_ID,
          facebookToken: process.env.FACEBOOK_TOKEN,
        });
        await client.getProfile();
      });
    });

    describe('Recommendations', () => {
      it('should fetch recommendations', async () => {
        const client = await TinderClient.create({
          facebookUserId: process.env.FACEBOOK_USER_ID,
          facebookToken: process.env.FACEBOOK_TOKEN,
        });
        await client.getRecommendations();
      });
    });

    describe('User', () => {
      it('should fetch user', async () => {
        const client = await TinderClient.create({
          facebookUserId: process.env.FACEBOOK_USER_ID,
          facebookToken: process.env.FACEBOOK_TOKEN,
        });
        await client.getUser(process.env.TEST_USER_ID);
      });
    });

    describe('Metadata', () => {
      it('should fetch metadata', async () => {
        const client = await TinderClient.create({
          facebookUserId: process.env.FACEBOOK_USER_ID,
          facebookToken: process.env.FACEBOOK_TOKEN,
        });
        await client.getMetadata();
      });
    });
  });
});
