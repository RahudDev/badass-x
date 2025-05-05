const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add fallbacks for Node.js modules
  config.resolve.fallback = {
    ...config.resolve.fallback,  // Ensure we preserve any existing fallbacks
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    process: require.resolve('process/browser.js'),
    buffer: require.resolve('buffer')
  };

  // Add the ProvidePlugin to make `process` and `Buffer` available globally
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  return config;
};
