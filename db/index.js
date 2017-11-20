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
  habitList: [], // <<<---ARRAY OF HABIT STRINGS
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

const signup = (user, cb) => {
  // TODO: Check if the user already exists in the database.
  
  let newUser = new User({
    username: user.username,
    password: user.password,
  });

  newUser.save((err, userEntry) => {
    if (err) {
      console.error(`Error saving user to database: ${err}`);
    }
    console.log(`${userEntry.username} saved to database.`);
  });
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

const checkLogin = (user, cb) => {
  // TODO: Check if the user is logged in.
  // If they exist, cb(true);
  // If not, cb(false);

  User.find({
    username: user.username
  }).exec((err, user) => {
    if (err) {
      console.error(err);
    }
  });
};

// create function for server to retrieve user's info
const retrieve = (query, callback) => {
  // build query
  User.find(query, (err, user) => {
    if (err) {
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

exports.save = save;
exports.retrieve = retrieve;
exports.logOccurrence = logOccurrence;
exports.createHabit = createHabit;
exports.getHabitData = getHabitData;
exports.getUserHabits = getUserHabits;
