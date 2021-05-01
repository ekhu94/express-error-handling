const mongoose = require('mongoose');

const Post = require('../models/post');

mongoose
  .connect('mongodb://localhost:27017/twitter', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log('Mongoose connection open'))
  .catch((err) => console.log(err));

const postSeeds = [
  {
    title: 'Post1',
    content: "Hold on Mike, we're gonna get there.",
  },
  {
    title: 'Post2',
    content: "Rem Lazar IS real Jay! He's more real than you or me.",
  },
  {
    title: 'Post3',
    content: 'What are the secrets, Jimmy?!?',
  },
  {
    title: 'Post4',
    content:
      'I bought your VHS tape Jimmy, now you gotta tell me what the secrets are!',
  },
  {
    title: 'Post5',
    content:
      'Welcome to our final...second annual final wheel of the worst episode!',
  },
];

const generatePostSeeds = async () => {
  for (let seed of postSeeds) {
    const post = new Post({ title: seed.title, content: seed.content });
    await post.save();
  }
};

generatePostSeeds().then(() => mongoose.connection.close());
