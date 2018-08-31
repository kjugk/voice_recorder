const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base').config
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const config = merge(baseConfig, {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CompressionPlugin({
      test: /\.(css)|(js)$/
    })
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { minimize: true } },
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
})

module.exports = config