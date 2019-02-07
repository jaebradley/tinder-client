const sharedConfig = require('./jest.config.shared');

const config = Object.assign(
  {
    testMatch: ['**/**.integration.test.js'],
  },
  sharedConfig,
);

module.exports = config;
