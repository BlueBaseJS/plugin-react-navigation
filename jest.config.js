const configs = require('@bluebase/code-standards/jest.config');

const esModules = [
  'react-native',
  '@react-navigation/',
  'react-navigation-stack',
  'react-navigation-tabs',
  'react-navigation-drawer',
  '@expo/vector-icons',
  // '@expo',
  // 'expo-font',
  // 'expo-constants',
  // 'expo-core',
  // 'expo-react-native-adapter'
].join('|');

module.exports = Object.assign(configs, {
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"]  
});