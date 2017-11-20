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
        cb(true); 
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
    }
    cb(userEntry.habitList);
  });
};

const getHabitData = (user, habit, cb) => {
  User.findOne({username: user.username}, (err, user) => {
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
exports.signup = signup;
exports.checkLogin = checkLogin;
exports.getUserHabits = getUserHabits;
exports.getHabitData = getHabitData;
exports.createHabit = createHabit;
exports.logOccurrence = logOccurrence;
