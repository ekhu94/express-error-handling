const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');

const { wrapAsync } = require('./utilities');
const AppError = require('./AppError');
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

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get(
  '/posts',
  wrapAsync(async (req, res) => {
    const posts = await Post.find({});
    res.render('posts/index', { posts });
  })
);

app.get('/posts/new', (req, res) => {
  res.render('posts/new');
});

app.get(
  '/posts/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      throw new AppError('post not found', 404);
    } else {
      res.render('posts/show', { post });
    }
  })
);

app.post(
  '/posts',
  wrapAsync(async (req, res) => {
    const post = new Post(req.body);
    await post.save();
    res.redirect(`/posts/${post._id}`);
  })
);

app.listen(3000, () => {
  console.log('Server listening on Port 3000');
});
