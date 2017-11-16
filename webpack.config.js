const webpack = require('webpack');

const BUILD_DIR; //path //dirname/src/public bundle.js directory
const APP_DIR; // index.jsx directory (react file)

module.exports = {
  entry: APP_DIR + '/index.jsx', //FILE WE WILL BUNDLE FROM
  output: {
    path: BUILD_DIR, //WHERE BUNDLE.JS WILL GO
    filename: 'bundle.js' //TRANSPILED FILE
  },
  module: {
    loaders: [
      test: /\.jsx?/, //specifying file type that will be transpiled
      include: APP_DIR,
      loader: 'babel-loader', //tells which transpiler to use
      query: {
        presets: ['react', 'es2015']  // this could also be put in a .babelrc file
      }
    ]
  }
};