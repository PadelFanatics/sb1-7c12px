const webpack = require('@nativescript/webpack');
const { resolve } = require('path');

module.exports = (env) => {
  webpack.init(env);

  webpack.chainWebpack((config) => {
    config.resolve.alias.set('@', resolve(__dirname, 'app'));
    
    // Optimize build performance
    config.optimization.minimize(true);
    config.optimization.splitChunks({
      chunks: 'all',
      minSize: 30000,
      maxSize: 250000
    });

    // Add source maps for better debugging
    if (env.development) {
      config.devtool('source-map');
    }
  });

  return webpack.resolveConfig();
};