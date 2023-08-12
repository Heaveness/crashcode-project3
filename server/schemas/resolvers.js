const { User, Codes, Comments } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async () => {
      return await User.find({}).populate('codes').populate({
        path: 'codes',
        populate: 'comments'
      });
    },
    singleUser: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    codes: async () => {
      return await Codes.find().populate('comments')
    },
    comments: async () => {
      return await Comments.find({}).populate('user');
    }
  },
  Mutation: {
    addUser: async (parent, {username, email, password}) => {
      const user = await User.create({username, email, password});
      const token = signToken(user);
      return {token ,user};
    },
    addCodes: async (parent, {title, content, programmingLanguage, username}) => {
      const codes = await Codes.create( {title, content, programmingLanguage, username});
      return codes;
    },
    addComments: async (parent, args) => {
      const comments = await Comments.create(args);
      return comments;
    },
    deleteCode: async (parent, { codeId }) => {
      return Codes.findOneAndDelete({ _id: codeId })
    },
    updateCode: async (parent, { codeId, content }) => {
      return Codes.findOneAndUpdate(
        { _id: codeId },
        { $set: { content: content } },
        { new: true },
      );
    }
  },
};

module.exports = resolvers;
