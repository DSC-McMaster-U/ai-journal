module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest' // Use Babel to process JavaScript and JSX files
  },
  testEnvironment: 'jest-environment-jsdom', // Mimics browser-like environment
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy' // Mock CSS imports
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'] // Extend Jest with DOM matchers
};
