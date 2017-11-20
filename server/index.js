const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const PORT = process.env.PORT || 3000;

// Use express.static to serve static public files
app.use(express.static(`${__dirname}/../client/public/`));
// Parse urlencoded bodies (into JSONs).
// We may be communicating nested objects, so set extended to true.
app.use(bodyParser.urlencoded({extended: true}));
// Parse JSONs into objects.
// This is the only data-type we use for client-server communication.
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('Received GET at /');
  res.send('ROOT');
});

// GET the login page for the user.
// Not sure if we will need to use this.
app.get('/login', (req, res) => {
  console.log('Received GET at /login');
  res.send('LOGIN PAGE');
});

// POST login data from the username
// {username:'stone', password:'sand'} 
// Not sure if we will need to use this.
app.post('/login', (req, res) => {
  console.log('Received POST at /login');
  // CONNECTION TO DATABASE HERE
  // db.checkLogin(req.body, (loginCheckData) => {}); 
  // Does the username exists?
  // Is the password correct?
  // If both are true, redirect to userpage.
  // Otherwise, redirect to login.
  // Inform the user why their attempt failed.
  res.send('YOU TRIED TO LOG IN');
});

// GET the signup page for the user.
// Not sure if we will need to use this.
app.get('/signup', (req, res) => {
  console.log('Received GET at /signup');
  res.send('SIGNUP PAGE');
});

// POST the signup information for the user.
// {username:'stone', password:'sand', email: 'stone@sandstone.com'}
// Not sure if we will need to use this.
app.post('/signup', (req, res) => {
  console.log('Received POST at /signup');
  db.signup(req.body, (newUser) => {
    if (newUser){ // User signed up.
      res.redirect(`/${newUser.username}`);
    } else { // User already exists, redirect to login.
      res.redirect('/login');
    }
  });
});

// GET the user's landing page after they login
// This is the main page the user will be interacting with.
app.get('/:username', (req, res) => {
  // TODO: Need to use session here eventually, for security / privacy.
  console.log(`Received GET at ${req.params.username}`);
  db.getUserHabits(req.params.username, (habitList) => {
    // res.send(habitList);
    let testHabitList = ['smoking', 'video-games', 'running'];
    res.send(testHabitList);
  });
});

// GET the user's occurrences for the requested habit.
// Eg, {habit: 'cigars'}
// RESPOND a habit object with unit, limit, timeframe, occurrences.
// Eg, {habit: 'running', timeframeStart: 'date', timeframeEnd:'date'}
// This is used to populate the user's page with data
app.get('/api/:username/:habit', (req, res) => {
  // TODO: Need to use session here eventually, for security / privacy.
  db.getHabitData(req.params.username, req.params.habit, (habitData) => {
    // res.send(habitData);
    let testHabitData = {
      unit: 'packs',
      limit: 2,
      timeframe: 'day',
      occurrences: [{ timestamp: new Date(), value: 1}]
    };
    res.send(testHabitData);
  });
  console.log(`Received GET at /api/${req.params.username}/occurrences`);
});

// POST by user to create a habit
// {habit:'smoking', unit:'cigars', limit:'5', timeframe: 'week'} 
app.post('/api/:username/habit', (req, res) => {
  // TODO: Need to use session here eventually, for security / privacy.
  console.log(`Received GET at /api/${req.params.username}/habit`);
  db.createHabit(req.body, (updatedHabitList) => {
      res.send(updatedHabitList);
  });
});

// POST by user to log an occurrence
// {timestamp: '2017116 2350', habit:'running', unit:'1'}
// Add the occurrence object to the occurrences array for that habit
app.post('/api/:username/log', (req, res) => {
  // TODO: Need to use session here eventually, for security / privacy.
  db.logOccurrence(req.body, (occurrence) => {
      res.send(occurrence);    
  });
  console.log(`Received GET at /api/${req.params.username}/log`);
  res.send(`LOGGING OCCURRENCE FOR ${req.params.username}`);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

// HELPERS

// Function to check whether a user is logged-in.
// Use as middleware.
function checkLogin(req, res, next) {

//  next();
}
