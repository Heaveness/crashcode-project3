const db = require('../config/connection');
const { User, Codes, Comments } = require('../models');

const userData = require('./userData.json');
const codeData = require('./codeData.json');
const commentData = require('./commentData.json');

db.once('open', async () => {
  await User.deleteMany({});
  await Codes.deleteMany({});
  await Comments.deleteMany({});
  
  const users = await User.insertMany(userData);
  const codes = await Codes.insertMany(codeData);
  const comments = await Comments.insertMany(commentData);

  console.log('All tables have been updated');
  process.exit(0);
});
