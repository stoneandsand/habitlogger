// TODO: FIX LINE 27 TO RESPOND TO SPECIFIC USERNAME
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

// GET the login page for the user.
// Not sure if we will need to use this.
app.get('/signup', (req, res) => {
  console.log('Received GET at /signup');
  res.send('SIGNUP PAGE');
});

// GET the user's landing page after they login
// This is the main page the user will be interacting with.
app.get('/username', (req, res) => { // <<<-------- FIX ME!!!!
  console.log('Received GET at /username');
  res.send('USER PAGE');
});

// GET the user's event data
// This will be used to populate the user's page with data
app.get('/api/username/events', (req, res) => {
  // CONNECTION TO DATABASE HERE
  console.log('Received GET at /api/username/events');
  res.send('GETTING YOUR EVENTS');
});

// POST by user to log an event
app.post('/api/username/logEvent', (req, res) => {
  // CONNECTION TO DATABASE HERE
  console.log('Received GET at /api/username/logEvent');
  res.send('LOGGING YOUR EVENT');
});

// POST by user to log an event type
app.post('/api/username/createEventType', (req, res) => {
  console.log('Received GET at /api/username/createEventType');
  res.send('CREATING YOUR EVENT TYPE');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
