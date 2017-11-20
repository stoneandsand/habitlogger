const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost/stoneandsand';
mongoose.Promise = require('bluebird');
mongoose.connect(DB_URI);

// Monitor the connection.
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'Connection error: '));
database.once('open', () => {
  console.log('Successfully connected to database.');
});

// SCHEMAS
// A user has many habits, and a habit has many occurrences.
// A user should only be able to access their own habit.
// A habit should only ever be able to access its own occurrences.
// We have decided to use embeded subdocuments to capture this data model.
// It should simplify querying.
// However, it may be worth considering using references instead,
// especially for the users<-->habit relationship.

const occurrenceSchema = new Schema({
  timestamp: Date,
  value: Number, // Number of units, e.g., 3 cigars.
});

const habitSchema = new Schema({
  // Is unique habit going to be a problem?
  // If it is a problem, consider using the habitList array.
  // If the habit exists in the habitList array,
  // don't allow the user to create a new habit.
  habit: {type: String, unique: true}, // e.g., smoking.
  limit: Number,
  unit: String, // e.g., cigars.
  timeframe: String, // e.g., day / week / month
  occurrences: [occurrenceSchema], // Emeded subdocument.
});

// Schema for a users.
const userSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  habitList: Array, // Array of strings, e.g., ['smoking', 'running']
  habits: [habitSchema],  // Embeded subdocument.
}); 
const User = mongoose.model('User', userSchema);

// METHODS
const signup = (user, cb) => {
  // Check if the user exists in the database.
  User.findOne({username: user.username}, (err, userEntry) => {
    if (err) {
      console.error(err);
    } else if (!userEntry) { // The user does not exist in the database.
      let newUser = new User({
        username: user.username,
        password: user.password,
      });
      newUser.save((err, newUserEntry) => {
        if (err) {
          console.error(`Error saving user to database: ${err}`);
        }
        console.log(`${newUserEntry.username} saved to database.`);
        cb(newUserEntry.username); 
      });
    } else { // The user already exists in the database.
      cb(false);
    }
  });
};

const checkLogin = (user, cb) => {
  // TODO: Check if the user is logged in / has a session.
  // If they exist, cb(true);
  // If not, cb(false);
  User.findOne({
    username: user.username
  }).exec((err, user) => {
    if (err) {
      console.error(err);
    }
  });
};

const getUserHabits = (user, cb) => {
  User.findOne({username: user.username}, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${user}'s habits.`);
    } else if (!userEntry) {
      cb([]); // If no user habits found, return empty array.
    } else {
      cb(userEntry.habitList);
    }
  });
};

const getHabitData = (user, habit, cb) => {
  User.findOne({username: user.username}, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${user}'s habits.`);
    }
    // Iterate over the user's habits and return the target habit.
    let targetHabit = userEntry.habits.filter(habitEntry => habitEntry.habit === habit).pop();

    if (targetHabit) {
      cb(targetHabit);
    } else {
      cb(null);
    }
  });
};

const createHabit = (user, habit, cb) => {
  User.findOne({username: user.username}, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${user}.`);
    }  else {
      userEntry.habitList.push(habit);
      userEntry.save((err, updatedUserEntry) => {
        if (err) {
          console.error(`Error getting ${user}'s habits.`);
        }
        cb(updatedUserEntry.habitList);
      });
    }
  });
};

const logOccurrence = (user, habit, occurrence, cb) => {
  User.findOne({username: user.username}, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${user}.`);
    }  else {
      userEntry.habits[habit].occurrences.push(occurrence);
      userEntry.save((err, updatedUserEntry) => {
        if (err) {
          console.error(`Error getting ${user}.`);
        }
        // Return the inputted occurence.
        // It is now the last item in its habit's occurrences array.
        cb(updatedUserEntry.habits[habit].occurrences.slice(-1)[0]); 
      });
    }
  });
};

// EXPORTS
exports.signup = signup;
exports.checkLogin = checkLogin;
exports.getUserHabits = getUserHabits;
exports.getHabitData = getHabitData;
exports.createHabit = createHabit;
exports.logOccurrence = logOccurrence;
