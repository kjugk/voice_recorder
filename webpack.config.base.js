const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

let clearOptions = {
  root: __dirname + '/public',
  verbose: true,
  dry: false
};

let config = {
  entry: {
    client: './client/index.tsx',
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'react-redux',
      'react-helmet',
      'redux-saga',
      'moment',
      'dexie',
      'classnames',
      'shortid',
      'd3'
    ]
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public/javascripts/'
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: 'client/tsconfig.json'
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin('javascripts', clearOptions),
    new WebpackShellPlugin({
      onBuildExit: ['node_modules/.bin/gulp']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    })
  ]
};

module.exports = {
  config
};
