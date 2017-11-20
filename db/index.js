const mongoose = require('mongoose');
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost/stoneandsand';
mongoose.Promise = require('bluebird');
mongoose.connect(DB_URI);

// Monitor connection
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'Connection error: '));
database.once('open', () => {
  console.log('Successfully connected to database.');
});

// Schema for a users.
const userSchema = mongoose.Schema({
  userName: String,
  password: String,
  habits: [], // <<<---check how to nest schemas
});
// Compile userSchema to a model for creating instances
const User = mongoose.model('User', userSchema);

const habitSchema = mongoose.Schema({
  habit: String, // Eg, smoking.
  unit: String, //
  timeframe: String,
  occurrences: [], // <<<---check how to nest schemas
});
const Habit = mongoose.model('Habit', habitSchema);

const occurrenceSchema = mongoose.Schema({
  timestamp: Date,
  value: Number, // Number of units, e.g., 3 cigars.
});
const Occurrence = mongoose.model('Occurrence', habitSchema);

// create function for server to save a user's info
const signup = (object) => {
  // create new instance of schema using passed object
  let newUser = new User({
    userName: object.userName,
  });

  // save new User into usersAccounts database
  newUser.save((error, object) => {
    // if there is an error, return in console
    if (error) {
      return console.error('error from database save:', error);
    } // if no errors, give confirmation
    console.log(`${object.userName} saved to usersAccounts database`);
  });
};

// create function for server to retrieve user's info
const retrieve = (query, callback) => {
  // build query
  User.find(query, (error, user) => {
    if (error) {
      return console.error('error from database retrieve: ', error);
    }
    // send user's info back via callback
    callback(user);
    // show confirmation of successful query
    console.log('this user was queried: ', user);
  });
};

const logOccurrence = (occurrence) => {

};

const createHabit = (habit) => {

};

const getHabitData = (habit) => {

};

const getUserHabits = (username) => {
  User.find({userName: username}, (err, user) => {
    if (err) {
      return console.error('db error', err);
    }
    console.log(user.habits);
    //callback(user.habits);
  });
};

exports.save = save;
exports.retrieve = retrieve;
exports.logOccurrence = logOccurrence;
exports.createHabit = createHabit;
exports.getHabitData = getHabitData;
exports.getUserHabits = getUserHabits;
