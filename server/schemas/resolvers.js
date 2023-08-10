const { User, Codes, Comments } = require('../models');

const resolvers = {
  Query: {
    user: async () => {
      return await User.find({}).populate('codes').populate({
        path: 'codes',
        populate: 'comments'
      });
    },
    codes: async () => {
      return await Codes.find().populate('comments')
    },
    comments: async () => {
      return await Comments.find({}).populate('user');
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    addCodes: async (parent, args) => {
      const codes = await Codes.create(args);
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
