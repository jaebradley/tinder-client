const sharedConfig = require('./jest.config.shared');

const config = Object.assign(
  {
    testMatch: ['**/**.unit.test.js'],
  },
  sharedConfig,
);

module.exports = config;
