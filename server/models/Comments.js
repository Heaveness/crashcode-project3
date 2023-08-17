// Imports required
const { Schema, model } = require('mongoose');

// Create the Comments schema
const commentsSchema = new Schema({
  text: {
    type: String,
    required: true,
    unique: false,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now }
});

const Comments = model('Comments', commentsSchema);

module.exports = Comments;
