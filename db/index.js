const bcrypt = require('bcrypt');

const saltRounds = 10;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = require('./schemas.js');

const DB_URI = process.env.MONGODB_URI ? `${process.env.MONGODB_URI}/stoneandsand` : 'mongodb://localhost/stoneandsand';
mongoose.Promise = require('bluebird');

mongoose.connect(DB_URI);

// Monitor the db connection.
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'Connection error: '));
database.once('open', () => {
  console.log('Successfully connected to database.');
});

// HELPERS
const sortByDate = (a, b) => {
  // Refer to docs for Array.prototype.sort.
  if (a.timestamp > b.timestamp) {
    return -1;
  } else if (a.timestamp < b.timestamp) {
    return 1;
  }
  return 0;
};

// METHODS
const signup = (user, cb) => {
  User.findOne({ username: user.username }, (err, userEntry) => {
    if (err) {
      console.error(err);
    } else if (!userEntry) {
      // The user does not exist in the database.
      bcrypt.hash(user.password, saltRounds, (err, hash) => {
        const newUser = new User({
          username: user.username,
          password: hash,
          phoneNumb: user.phoneNumb,
        });
        newUser.save((err, newUserEntry) => {
          if (err) {
            console.error(`Error saving user to database: ${err}`);
            cb(false);
          } else {
            cb(newUserEntry.username);
          }
        });
      });
    } else {
      // The user already exists in the database.
      cb(false);
    }
  });
};

const verifyLogin = (user, cb) => {
  // Only return true if both the username and hash match.
  if (user.username && user.password) {
    // ^TODO: Move JSON property checking to router-side.
    User.findOne(
      {
        username: user.username,
      },
      (err, userEntry) => {
        if (err) {
          console.error(err);
        } else if (userEntry && userEntry.password) {
          bcrypt.compare(user.password, userEntry.password, (err, hashMatches) => {
            if (hashMatches) {
              cb(true);
            } else {
              // Hashes don't match.
              cb(false);
            }
          });
        } else {
          // No userEntry or password exists.
          cb(false);
        }
      }
    );
  } else {
    // Client did not submit a username or password.
    cb(false);
  }
};

const getUserHabits = (user, cb) => {
  User.findOne({ username: user }, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${user}'s habits.`);
    } else if (!userEntry) {
      cb([]); // If no user habits found, return empty array, to prevent errors on client.
    } else {
      cb(userEntry.habitList);
    }
  });
};

const getGraphData = (user, cb) => {
  User.findOne({ username: user }, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${user}'s habits.`);
    } else if (!userEntry) {
      cb([]); // If no user habits found, return empty array, to prevent errors on client.
    } else {
      cb(userEntry.habits);
    }
  });
};


const getHabitData = (user, habit, cb) => {
  User.findOne({ username: user }, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${user}'s habits.`);
    }
    // Iterate over the user's habits and return the target habit.
    const targetHabit = userEntry.habits.filter(habitEntry => habitEntry.habit === habit).pop();
    targetHabit.occurrences.sort(sortByDate); // The client expects sorted occurrences.

    if (targetHabit) {
      cb(targetHabit);
    } else {
      cb(null);
    }
  });
};

const createHabit = (habitData, cb) => {
  User.findOne({ username: habitData.username }, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${habitData.username}.`);
    } else {
      console.log('userEntry: ', userEntry)
      userEntry.habitList.push(habitData.habit);
      userEntry.habits.push({
        habit: habitData.habit,
        limit: habitData.limit,
        unit: habitData.unit,
        timeframe: habitData.timeframe,
        deadline: habitData.deadline,
        messageSent: habitData.messageSent,
      });
      userEntry.save((err, updatedUserEntry) => {
        if (err) {
          console.error(`Error getting ${habitData.username}'s habits.`);
          cb([]); // In case of an error, send to prevent client from crashing.
        } else {
          cb(updatedUserEntry.habitList);
        }
      });
    }
  });
};

const logOccurrence = (logData, cb) => {
  User.findOne({ username: logData.username }, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${user}.`);
    } else {
      // habits is an array of habits, not an object reference.
      // We have to iterate over each habit in this array to find the target habit.
      // Once found, we log the occurrence to that habit.
      userEntry.habits.forEach(habitEntry => {
        if (logData.habit === habitEntry.habit) {
          habitEntry.occurrences.push(logData.occurrence);
          userEntry.save((err, updatedUserEntry) => {
            if (err) {
              console.error(`Error getting ${user}.`);
              cb(null);
            } else {
              // Return the inputted occurence.
              // It is now the last item in its habit's occurrences array.
              cb(logData.occurrence);
            }
          });
        }
      });
    }
  });
};

const updateMessage = (habit, username) => {
  User.update({'username': username, 'habits.habit': habit}, {'$set': {
    'habits.$.messageSent': true
    }
  }, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('updated!')
      User.find({}, (err, userEntry) => {
        if(err) {
          console.log(err);
        } else {
          // console.log('HERE IS THE userEntry>>>>>>>>>>', userEntry[0].habits)
        }
      })
    };
  })
}
// updateMessage('rolling', 'Sand');

const getInfo = (cb) => {
  User.find({}, (err, userEntry) => {
    if(err){
      console.log(`Error getting ${user}.`);
    } else {
      // console.log('userEntry: ', userEntry)
      let currentUser = [];
      for(let i = 0; i < userEntry.length; i++){
        let person = userEntry[i].habits.map(habit => {
        // console.log('userEntry', userEntry[i].username)
          // console.log('username: ', userEntry[i].username)
          // console.log('habit: ', habit.habit)
          // console.log('phoneNumb: ', userEntry[i].phoneNumb)
          // console.log('deadline: ', habit.deadline)
          // console.log('messageSent: ', habit.messageSent)
          return {
            username: userEntry[i].username,
            habit: habit.habit || '',
            phoneNumb: userEntry[i].phoneNumb,
            deadline: habit.deadline || '',
            messageSent: habit.messageSent,
          }
        })
        // console.log('person: ', person)
        currentUser = currentUser.concat(person);
      }
      // console.log('currentUser: ', currentUser)
      // console.log('entry length: ', userEntry.length)
      // console.log('user[0]', userEntry[0])
      // console.log('user[1]', userEntry[1])

      cb(currentUser);
    }
  })
}

// User.find({}, (err, data) => {
//   if(err) return console.log(err);
//   console.log('>>>>>>>>', data)
// })

// EXPORTS
module.exports = {
  signup,
  verifyLogin,
  getUserHabits,
  getHabitData,
  createHabit,
  logOccurrence,
  updateMessage,
  getGraphData,
  getInfo,
}
