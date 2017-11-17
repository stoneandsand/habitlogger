const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '/client/public'); //path //dirname/src/public bundle.js directory
const APP_DIR = path.resolve(__dirname, '/client/src'); // index.jsx directory (react file)

module.exports = {
  entry: `${APP_DIR}/index.jsx`, // FILE WE WILL BUNDLE FROM
  output: {
    path: BUILD_DIR, // WHERE BUNDLE.JS WILL GO
    filename: 'bundle.js' // TRANSPILED FILE
  },
  module: {
    loaders: [{
      test: /\.jsx?/, // Specifying file type that will be transpiled
      include: APP_DIR,
      loader: 'babel-loader', // Tells which transpiler to use
      query: {
	      presets: ['react', 'es2015'] // This could also be put in a .babelrc file
      }
    }
   ]
  }
};
