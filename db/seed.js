const fs = require('fs');
const path = require('path');
const db = require('./index.js');
const DB_URI = 'mongodb://localhost/stoneandsand';

fs.readFile(path.jon(`${__dirname}/data.json`), 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    let userData = JSON.parse(data);

// signup
// checkLogin
// getUserHabits
// getHabitData
// createHabit
// logOccurrence
    
  }
});
