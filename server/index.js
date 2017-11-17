// TODO: CONNECT TO DB
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
  res.send('YOU TRIED TO LOG IN');
});

// GET the login page for the user.
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
  res.send('YOU TRIED TO SIGN UP');
});

// GET the user's landing page after they login
// This is the main page the user will be interacting with.
app.get('/:username', (req, res) => {
  console.log(`Received GET at ${req.params.username}`);
  res.send(`HELLO, ${req.params.username}`);
});

// GET the user's occurrences for the requested habit
// {habit: 'cigars'}
// {habit: 'running', timeframeStart: 'date', timeframeEnd:'date'}
// This will be used to populate the user's page with data
app.get('/api/:username/occurrences', (req, res) => {
  // CONNECTION TO DATABASE HERE
  // Return habit object with unit, limit, timeframe, occurrences
  console.log(`Received GET at /api/${req.params.username}/occurrences`);
  res.send(`GETTING ${req.params.username}'s OCCURRENCES`);
});

// POST by user to log an occurrence
// {timestamp: '2017116 2350', habit:'running', unit:'1'}
app.post('/api/:username/log', (req, res) => {
  // CONNECTION TO DATABASE HERE
  // Add the object to the occurrences array for that habit
  console.log(`Received GET at /api/${req.params.username}/log`);
  res.send(`LOGGING OCCURRENCE FOR ${req.params.username}`);
});

// POST by user to create a habit
// {habit:'smoking', unit:'cigars', limit:'5', timeframe: 'week'} 
app.post('/api/:username/habit', (req, res) => {
  console.log(`Received GET at /api/${req.params.username}/habit`);
  res.send(`CREATING NEW HABIT FOR ${req.params.username}`);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

// HELPERS

// Function to check whether a user is logged-in.
// Use as middleware.
function checkLogin() {
  
}
