// webpack.config.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.mjs'],  // Add .mjs for compatibility
    fallback: {
      process: require.resolve('process/browser.js'),
      // Add any other fallbacks here if needed
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser.js', // Ensure process is globally available
      Buffer: ['buffer', 'Buffer'], // Make Buffer available globally
    }),
  ],
  devtool: 'source-map', // Or whatever other devtool you are using
  ignoreWarnings: [
    (warning) => warning.module?.resource?.includes('node_modules/@mediapipe')
  ],
};
