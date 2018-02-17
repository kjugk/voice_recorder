const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base').config

const config = merge(baseConfig, {
  watch: true,
  devtool: 'source-map',
});

module.exports = config