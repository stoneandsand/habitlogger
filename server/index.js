const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');
const compiler = webpack(config);
const sendMessageCron = require('./cronMessage.js').sendMessageCron;

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
    },
  })
);
app.use(webpackHotMiddleware(compiler));

app.use(express.static(`${__dirname}/../client/public/`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'lss*739md9d@#ksz0)',
  saveUninitialized: true,
  resave: false,
  cookie: { secure: false },
}));

// HELPERS

// checkLoginAuth:
// 1. Checks whether a user is already logged-in.
// 2. Prevents a non-authenticated user to query another user's info.
// req.session.user is only set after successful login or signup.
const checkLoginAuthStatus = (req, res, next) => {
  const isLoggedIn = req.session ? !!req.session.user : false;
  const isActualUser = req.session.user === req.params.username;
  if (isLoggedIn && isActualUser) {
    console.log('req.session.user: ', req.session.user)
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
    if (username) {
      req.session.user = username;
      res.send(username);
    } else {
      // User already exists.
      res.send(null);
    }
  });

});

// GET FAUX DATA

app.get('/faux', (req, res) => {

})

app.post('/login', (req, res) => {
  // Expects a JSON from the client.
  // {username:'stone', password:'sand'}
  const isLoggedIn = req.session ? !!req.session.user : false;
  if (!isLoggedIn) {
    db.verifyLogin(req.body, (correctCredentials) => {
      if (correctCredentials) {
        req.session.user = req.body.username;
        res.send(req.session.user);
      } else {
        res.send(null);
      }
    });
  } else {
    // User already logged in.
    res.redirect('/');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

app.get('/api/:username', (req, res) => {
  // Get the user's list of habits.
  console.log('habit list from endpoint', req.params.username);
  // Used to field selectors on client.
  db.getUserHabits(req.params.username, (habitList) => {
    console.log('true habits', habitList);
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

app.get('/sessionCheck', (req, res) => {
  res.send(req.session);
});

app.get('/graphData', (req, res) => {
  db.getGraphData(req.session.user, (graphData) => {
    res.send(graphData);
  });
})

sendMessageCron.start();

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
