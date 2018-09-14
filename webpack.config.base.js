const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

let clearOptions = {
  root: __dirname + '/public',
  verbose: true,
  dry: false
};

let config = {
  entry: {
    main: './src/index.tsx'
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
        loader: 'awesome-typescript-loader'
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: 'file-loader',
        options: {
          outputPath: './fonts',
          publicPath: (path) => '/dist/fonts/' + path,
          name: '[name].[hash:8].[ext]'
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin('dist', clearOptions),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: path.resolve(__dirname, './src/assets/index.html'),
      minify: true
    })
  ]
};

module.exports = {
  config
};
