const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const PORT = process.env.PORT || 3000;
const session = require('express-session');

app.use(express.static(`${__dirname}/../client/public/`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  secret: 'lss*739md9d@#ksz0)',
  saveUninitialized: true,
  resave: false,
}));

app.get('/', (req, res) => {
  console.log('Received GET at /');
  res.send('ROOT');
});

app.get('/logout', (req, res) => {
  console.log('Received GET at /logout');
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// POST login data from the username
// {username:'stone', password:'sand'}
// Not sure if we will need to use this.
app.post('/login', (req, res) => {
  console.log('Received POST at /login');
  let isLoggedIn = req.session ? !!req.session.user : false;
  if (!isLoggedIn) {
    db.checkLogin(req.body, (correctCredentials) => {
      if (correctCredentials) {
        console.log(`${req.body.username} logged in succesfully.`);
        req.session.user = req.body.username;
        res.send(req.session.user); 
      } else {
        console.log(`${req.body.username} failed to log in.`);
        res.send(null); 
      }
    });
  } else { // The user is already logged in.
    res.redirect('/');
  }
});

// POST the signup information for the user.
// {username:'stone', password:'sand', email: 'stone@sandstone.com'}
// Not sure if we will need to use this.
app.post('/signup', (req, res) => {
  console.log('Received POST at /signup');
  db.signup(req.body, (createdNewUser) => {
    console.log(createdNewUser);
    if (createdNewUser){ // User signed up.
      res.redirect(`/${createdNewUser.username}`);
    } else { // User already exists, redirect to login.
      res.send(null);
    }
  });
});

// GET the user's landing page after they login
// This is the main page the user will be interacting with.
app.get('/:username', checkLogin, (req, res) => {
  console.log(`Received GET at ${req.params.username}`);
  console.log(`${req.session.user} accessed their page.`);
  db.getUserHabits(req.params.username, (habitList) => {
    console.log(habitList);
    res.send(habitList);
  });
});

// GET the user's occurrences for the requested habit.
// Eg, {habit: 'cigars'}
// RESPOND a habit object with unit, limit, timeframe, occurrences.
// Eg, {habit: 'running', timeframeStart: 'date', timeframeEnd:'date'}
// This is used to populate the user's page with data
app.get('/api/:username/:habit', checkLogin, (req, res) => {
  console.log(`Received GET at /api/${req.params.username}`);
  db.getHabitData(req.session.user, req.params.habit, (habitData) => {
    console.log(habitData);
    res.send(habitData);
  });
});

// POST by user to create a habit
// {habit:'smoking', unit:'cigars', limit:'5', timeframe: 'week'}
app.post('/api/:username/habit', checkLogin, (req, res) => {
  // TODO: Need to use session here eventually, for security / privacy.
  console.log(`Received POST at /api/${req.params.username}/habit`);
  db.createHabit(req.body, (updatedHabitList) => {
    res.send(updatedHabitList);
  });
});

// POST by user to log an occurrence
// {timestamp: '2017116 2350', habit:'running', unit:'1'}
// Add the occurrence object to the occurrences array for that habit
app.post('/api/:username/log', checkLogin, (req, res) => {
  db.logOccurrence(req.body, (occurrence) => {
    res.send(occurrence);
  });
  console.log(`Received POST at /api/${req.params.username}/log`);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

// HELPERS

// Function to check whether a user is logged-in.
// Use as middleware.
function checkLogin(req, res, next) {
  let isLoggedIn = req.session ? !!req.session.user : false;
  let isActualUser = req.session.user === req.params.username;
  if(isLoggedIn && isActualUser) {
    next();
  } else {
    res.redirect('/');
  }
}
