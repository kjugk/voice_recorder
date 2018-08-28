const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

let clearOptions = {
  root: __dirname + '/public',
  verbose: true,
  dry: false
};

let config = {
  entry: {
    main: './client/index.tsx'
  },
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/dist',
    path: __dirname + '/public/dist/'
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
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin('dist', clearOptions),
    // new WebpackShellPlugin({
    //   onBuildExit: ['node_modules/.bin/gulp']
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './client/assets/index.html'),
      minify: true
    })
  ]
};

module.exports = {
  config
};
