const configs = require('@bluebase/code-standards/jest.config');

const esModules = ['react-native', 'react-navigation-stack'].join('|');

module.exports = Object.assign(configs, {
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"]  
});