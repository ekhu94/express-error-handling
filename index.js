const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const { wrapAsync } = require('./utilities');
const Post = require('./models/post');

mongoose
  .connect('mongodb://localhost:27017/twitter', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connection Open'))
  .catch((e) => console.log(e));

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('Server listening on Port 3000');
});
