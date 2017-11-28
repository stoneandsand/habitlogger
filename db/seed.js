const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const db = require('./index.js');

mongoose.connect('mongodb://localhost/stoneandsand', {useMongoClient: true}, () => {
  mongoose.connection.db.dropDatabase();
});

fs.readFile(path.join(`${__dirname}/data.json`), 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    data = JSON.parse(data);

    data.forEach(dummyUser => {
      let userData = {
        username: dummyUser.username,
        password: dummyUser.password,
      };

      console.log('TESTING SIGNUP.');
      db.signup(userData, (confirmUser) => {
        console.log(`${confirmUser} was signed up.`);

        console.log('TESTING CREATE HABIT.');
        dummyUser.habits.forEach(dummyHabit => {
          let habitData = {
            username: dummyUser.username,
            habit: dummyHabit.habit,
            limit: dummyHabit.limit,
            unit: dummyHabit.unit,
            timeframe: dummyHabit.timeframe,
          };

          db.createHabit(habitData, (confirmList)=> {
            console.log(`${confirmUser}'s habit list is now ${confirmList}.`);

            console.log('TESTING LOG OCCURRENCE.');
            dummyHabit.occurrences.forEach(occurrence => {
              let logData = {
                username: dummyUser.username,
                habit: dummyHabit.habit,
                occurrence: occurrence,
              };

                db.logOccurrence(logData, (confirmOccur) => {
                  console.log(`Last occurrence is now ${JSON.stringify(confirmOccur)}`);
                });
            });
          });
        });
      });
    });
  }
});
