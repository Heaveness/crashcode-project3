const { Schema, model } = require('mongoose');

const codeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  programmingLanguage: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments'
  }],
  username: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Codes = model('Codes', codeSchema);

module.exports = Codes;
