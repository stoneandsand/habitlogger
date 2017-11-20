const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost/stoneandsand';
mongoose.Promise = require('bluebird');
mongoose.connect(DB_URI);

// Monitor connection
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'Connection error: '));
database.once('open', () => {
  console.log('Successfully connected to database.');
});

// SCHEMAS
const occurrenceSchema = new Schema({
  timestamp: Date,
  value: Number, // Number of units, e.g., 3 cigars.
});
const Occurrence = mongoose.model('Occurrence', habitSchema);

const habitSchema = new Schema({
  habit: String, // Eg, smoking.
  unit: String, //
  timeframe: String,
  occurrences: [Occurrence], // <<<---check how to nest schemas
});
const Habit = mongoose.model('Habit', habitSchema);

// Schema for a users.
const userSchema = new Schema({
  userName: String,
  password: String,
  habitList: Array, // Array of strings.
  habits: [Habit],
}); // <<<---check how to nest schemas
const User = mongoose.model('User', userSchema);


// METHODS
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

const getUserHabits = (user, cb) => {
  User.find({username: user.username}, (err, user) => {
    if (err) {
      console.error(`Error getting ${user}'s habits.`);
    }
    //cb(user.habitList);
  });
};

const getHabitData = (user, habit, cb) => {
  // user.habits[habit]
  // user.habits[habit].occurrences.push()
  
  User.find({username: user.username}, (err, user) => {
    if (err) {
      console.error(`Error getting ${user}'s habits.`);
    }
    // Retrieve habit
    // cb(habit);
  });
};

const createHabit = (user, habit, cb) => {
  User.find({username: user.username}, (err, user) => {
    if (err) {
      console.error(`Error getting ${user}.`);
    }
    // Retrieve user.
    // Add habit to habitlist
    // Add habit object to habits array
    //cb(user.habitList);
  });  
};

const logOccurrence = (user, habit, occurrence, cb) => {
  User.find({username: user.username}, (err, user) => {
    if (err) {
      console.error(`Error getting ${user}.`);
    }
    // Retrieve user
    // Retrieve habit
    // Retrieve occurrence for habits
    // Push occurrence onto occurrence for habits
    //cb(user.habitList);
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

// EXPORTS
exports.save = save;
exports.retrieve = retrieve;
exports.logOccurrence = logOccurrence;
exports.createHabit = createHabit;
exports.getHabitData = getHabitData;
exports.getUserHabits = getUserHabits;
