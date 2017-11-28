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

// HELPERS

// checkLoginAuth:
// 1. Checks whether a user is already logged-in.
// 2. Prevents a non-authenticated user to query another user's info.
// req.session.user is only set after successful login or signup.
const checkLoginAuthStatus = (req, res, next) => {
  let isLoggedIn = req.session ? !!req.session.user : false;
  let isActualUser = req.session.user === req.params.username;
  if(isLoggedIn && isActualUser) {
    next();
  } else {
    res.redirect('/');
  }
};

// ROUTING

app.post('/signup', (req, res) => {
  // Expects a JSON from the client.
  // {username:'stone', password:'sand'}
  db.signup(req.body, (username) => {
    if (username){
      req.session.user = username;
      res.send(username);
    } else { // User already exists.
      res.send(null);
    }
  });
});

app.post('/login', (req, res) => {
  // Expects a JSON from the client.
  // {username:'stone', password:'sand'}
  let isLoggedIn = req.session ? !!req.session.user : false;
  if (!isLoggedIn) {
    db.verifyLogin(req.body, (correctCredentials) => {
      if (correctCredentials) {
        req.session.user = req.body.username;
        res.send(req.session.user); 
      } else {
        res.send(null); 
      }
    });
  } else { // User already logged in.
    res.redirect('/');
  }
});

app.get('/:username', checkLoginAuthStatus, (req, res) => {
  // Get the user's list of habits.
  // Used to field selectors on client.
  db.getUserHabits(req.params.username, (habitList) => {
    res.send(habitList);
  });
});

app.get('/api/:username/:habit', checkLoginAuthStatus, (req, res) => {
  // Get the data for a particular habit.
  // Used to field the chart and table.
  db.getHabitData(req.session.user, req.params.habit, (habitData) => {
    res.send(habitData);
  });
});

app.post('/api/:username/habit', checkLoginAuthStatus, (req, res) => {
  // Create a new habit.
  // Expects a JSON with username, habit, limit, unit, and timeframe properties.
  // {habit:'smoking', limit:'5', unit:'cigars', username:'Sand', timeframe: 'week'}
  db.createHabit(req.body, (updatedHabitList) => {
    res.send(updatedHabitList);
  });
});

app.post('/api/:username/log', checkLoginAuthStatus, (req, res) => {
  // Log an occurrence.
  // Expects a JSON with a timestamp, habit, and value.
  // {habit:'running', unit:'1', timestamp: '2017-11-28T00:23:28.341Z'}
  db.logOccurrence(req.body, (occurrence) => {
    res.send(occurrence);
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
