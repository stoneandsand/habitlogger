const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'client/public'); // path //dirname/src/public bundle.js directory
const APP_DIR = path.resolve(__dirname, 'client/src'); // index.jsx directory (react file)

module.exports = {
  entry: ['webpack-hot-middleware/client?reload=true', `${APP_DIR}/index.jsx`], // FILE WE WILL BUNDLE FROM
  output: {
    path: BUILD_DIR, // WHERE BUNDLE.JS WILL GO
    filename: 'bundle.js', // TRANSPILED FILE
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/, // Specifying file type that will be transpiled
        include: APP_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader', // Tells which transpiler to use
        query: {
          presets: ['react', 'es2015'], // This could also be put in a .babelrc file
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader', {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};



