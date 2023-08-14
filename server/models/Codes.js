const { Schema, model } = require('mongoose');
const moment = require('moment');

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
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

codeSchema.virtual('formattedCreatedAt').get(function () {
  return moment(this.createdAt).format('MMMM Do YYYY, h:mm:ss a');
});

codeSchema.set('toJSON', { virtuals: true });

const Codes = model('Codes', codeSchema);

module.exports = Codes;
