const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config) {
  config.plugins.push(new MonacoWebpackPlugin());
  config.resolve.fallback = {
    path: require.resolve('path-browserify')
  };
  return config;
};
