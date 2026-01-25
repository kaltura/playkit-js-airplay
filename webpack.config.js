'use strict';

const webpack = require('webpack');
const path = require('path');
const packageData = require('./package.json');

module.exports = {
  context: __dirname + '/src',
  entry: {
    'playkit-airplay': 'index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: ['KalturaPlayer', 'plugins', 'airplay'],
    devtoolModuleFilenameTemplate: './airplay/[resource-path]'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(packageData.version),
      __NAME__: JSON.stringify(packageData.name)
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              rules: {
                semi: 0
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/src'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  externals: {
    '@playkit-js/kaltura-player-js': ['KalturaPlayer']
  }
};
