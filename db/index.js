// require mongoose in order to use it
const mongoose = require('mongoose');

// set mongoose's promise library to bluebird
mongoose.Promise = require('bluebird');

// create connection with usersAccounts database
mongoose.connect('mongodb://localhost/usersAccounts');

// monitor connection
var database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error: '));
database.once('open', function() {
  console.log('successfully connected to usersAccounts database');
})

// create schema for a user account
const userSchema = mongoose.Schema({
  userName: 'string',
  password: 'string',
  habits: [] // <<<---check how to nest schemas
});

const habitsSchema = mongoose.Schema({
  habit: 'string',
  unit: 'string',
  timeframe: 'string',
  occurances: [] // <<<---check how to nest schemas
});

const occurencesSchema = mongoose.Schema({
  timestamp: 'number',
  value: 'number'
});

// compile userSchema to a model for creating instances
var User = mongoose.model('User', userSchema);

// create function for server to save a user's info
save = function(object) {
  // create new instance of schema using passed object
  object = new User({
    userName: object.userName
  })

  // save new User into usersAccounts database
  object.save((error, object) => {
    // if there is an error, return in console
    if(error) {
      return console.error('error from database save:', error);
    } else {  // if no errors, give confirmation
      console.log(object.userName + ' saved to usersAccounts database');
    }
  })
}

// create function for server to retrieve user's info
retrieve = function(query, callback) {
  // build query
  User.find(query, (error, user) => {
    if(error) {
      return console.error('error from database retrieve: ',error);
    } else {
      // send user's info back via callback
      callback(user);
      // show confirmation of successful query
      console.log('this user was queried: ',user)
    }
  });
}

// FIRST ITERATION OF SCHEMA
// database = {
//   {
//     user: String,
//     password: String,
//     habits: {
//       smoking: {
//         unit: 'packs',
//         limit: 5,
//         timeframe: 'day',
//         occurrences: [{ timestamp: '20171114', value: 3}]
//       },
//       videogames: {
//         unit: 'hours',
//         limit: 8,
//         timeframe: 'week',
//         occurrences: [{ timestamp: '20171114', value: 3}]
//       }
//     }
//   }
// };

// SECOND ITERATION OF SCHEMAS
// userSchema = {
//   user: 'string',
//   password: 'string',
//   habits: [habitsSchema]
// }

// habitsSchema = {
//   habit: 'string',
//   unit: 'string',
//   limit: 'number',
//   timeframe: 'string',
//   occurances: [occurencesSchema]
// }

// occurencesSchema = {
//   timestamp: 'number',
//   value: 'number'
// }

module.exports.save = save;
module.exports.retrieve = retrieve;