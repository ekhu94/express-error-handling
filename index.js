const express = require('express');
const app = express();

const AppError = require('./AppError');

const verifyUser = (req, res, next) => {
  const { user } = req.query;
  if (user === 'richevans') {
    next();
  } else {
    throw new AppError('you are not authorized', 403);
  }
};

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === 'remlazar') {
    next();
  } else {
    throw new AppError('password rejected', 401);
  }
};

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/dogs', (req, res) => {
  res.send('Doggy world!');
});

app.get('/secret', verifyPassword, (req, res) => {
  res.send('I need a tailor...because I RIPPED MY PANTS!!');
});

app.get('/error', (req, res) => {
  lantz.tryToCode();
});

app.get('/admin', verifyUser, (req, res) => {
  res.send('Rich Evans is a generous God.');
});

app.use((err, req, res, next) => {
  //* CUSTOM ERROR HANDLING
  const { status = 500, message = 'something went wrong' } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log('Server listening on Port 3000');
});
