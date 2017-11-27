const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./schemas.js');
const DB_URI = process.env.MONGODB_URI ? `${process.env.MONGODB_URI}/stoneandsand` : 'mongodb://localhost/stoneandsand';

mongoose.Promise = require('bluebird');
mongoose.connect(DB_URI);

// Monitor the connection.
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'Connection error: '));
database.once('open', () => {
  console.log('Successfully connected to database.');
});

// HELPERS
const sortByDate = (a, b) => {
  if (a.timestamp > b.timestamp) {
    return -1;
  } else if (a.timestamp < b.timestamp) {
    return 1;
  } else {
    return 0;
  }
};

// METHODS
const signup = (user, cb) => {
  // Check if the user exists in the database.
  User.findOne({username: user.username}, (err, userEntry) => {
    if (err) {
      console.error(err);
    } else if (!userEntry) { // The user does not exist in the database.
      bcrypt.hash(user.password, saltRounds, (err, hash) => {
        let newUser = new User({
          username: user.username,
          password: hash,
        });
        newUser.save((err, newUserEntry) => {
          if (err) {
            console.error(`Error saving user to database: ${err}`);
          }
          console.log(`${newUserEntry.username} saved to database.`);
          cb(newUserEntry.username);
        });
      });
    } else { // The user already exists in the database.
      cb(false);
    }
  });
};

const checkLogin = (user, cb) => {
  if (user.username && user.password) {
    User.findOne({
      username: user.username
    }, (err, userEntry) => {
      if (err) {
        console.error(err);
      } else {
        if (userEntry && userEntry.password) {
          bcrypt.compare(user.password, userEntry.password, function(err, match) {
            if (match) {
              cb(true);
            } else {
              cb(false);
            }
          });
        } else {
          cb(false);
        }
      }
    });
  } else {
    cb(false);
  }
};

const getUserHabits = (user, cb) => {
  User.findOne({username: user}, (err, userEntry) => {
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
  User.findOne({username: user}, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${user}'s habits.`);
    }
    // Iterate over the user's habits and return the target habit.
    let targetHabit = userEntry.habits.filter(habitEntry => habitEntry.habit === habit).pop();
    targetHabit.occurrences.sort(sortByDate);
    
    if (targetHabit) {
      cb(targetHabit);
    } else {
      cb(null);
    }
  });
};

const createHabit = (habitData, cb) => {
  User.findOne({username: habitData.username}, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${habitData.username}.`);
    }  else {
      userEntry.habitList.push(habitData.habit);
      userEntry.habits.push({
        habit: habitData.habit,
        limit: habitData.limit,
        unit: habitData.unit,
        timeframe: habitData.timeframe,
      });
      userEntry.save((err, updatedUserEntry) => {
        if (err) {
          console.error(`Error getting ${habitData.username}'s habits.`);
          cb([]);
        } else {
          cb(updatedUserEntry.habitList);
        }
      });
    }
  });
};

const logOccurrence = (logData, cb) => {
  User.findOne({username: logData.username}, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${user}.`);
    }  else {
      userEntry.habits.forEach(habitEntry => {
        if (logData.habit === habitEntry.habit) {
          habitEntry.occurrences.push(logData.occurrence);
          userEntry.save((err, updatedUserEntry) => {
            if (err) {
              console.error(`Error getting ${user}.`);
            }
            // Return the inputted occurence.
            // It is now the last item in its habit's occurrences array.
            cb(logData.occurrence); // TODO: Return the actual last occurrence from the userEntry.
          });
        }
      });
    }
  });
};

// EXPORTS
module.exports.signup = signup;
module.exports.checkLogin = checkLogin;
module.exports.getUserHabits = getUserHabits;
module.exports.getHabitData = getHabitData;
module.exports.createHabit = createHabit;
module.exports.logOccurrence = logOccurrence;
