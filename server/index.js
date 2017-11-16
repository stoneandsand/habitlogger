const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Hello, World.');
});

app.get('/login', (req, res) => {
  
});

app.get('/signup', (req, res) => {

});


app.get('/username', (req, res) => {

});


app.get('/api/username/event', (req, res) => {

});

app.post('/api/username/logEvent', (req, res) => {

});

app.post('/api/username/createEventType', (req, res) => {

});

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});
