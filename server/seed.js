require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

const db = require('./models');

const users = [{
  username: 'username',
  password: 'password'
},
{
  username: 'asdasdasd',
  password: 'qweqweqwe'
},
];

const polls = [{
  question: 'Question number one?',
  options: ['Yes', 'No', 'Dunno'],
},
{
  question: 'Question number two?',
  options: ['infa', 'stosowana']
},
{
  question: 'Question number three',
  options: ['one!!111oneeon1', 'two']
},
{
  question: 'hi all?',
  options: ['123', 'Fzxce']
},
];

const seed = async () => {
  try {
    await db.User.remove();
    console.log('DROP ALL USERS');

    await db.Poll.remove();
    console.log('DROP ALL POLLS');

    await Promise.all(
      users.map(async user => {
        const data = await db.User.create(user);
        await data.save();
      }),
    );
    console.log('CREATED USERS', JSON.stringify(users));

    await Promise.all(
      polls.map(async poll => {
        poll.options = poll.options.map(option => ({
          option,
          votes: 0
        }));
        const data = await db.Poll.create(poll);
        const user = await db.User.findOne({
          username: 'username'
        });
        data.user = user;
        user.polls.push(data._id);
        await user.save();
        await data.save();
      }),
    );
    console.log('CREATED POLLS', JSON.stringify(polls));
  } catch (err) {
    console.error(err);
  }
};

seed();