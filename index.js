const express = require('express');
const app = express();

const AppError = require('./AppError');

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/dogs', (req, res) => {
  res.send('Doggy world!');
});

app.listen(3000, () => {
  console.log('Server listening on Port 3000');
});
