const { User, Codes, Comments } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    user: async () => {
      return await User.find({}).populate('codes').populate({
        path: 'codes',
        populate: 'comments'
      });
    },
    singleUser: async (parent, { userId }) => {
      return await User.findOne({ _id: userId }).populate('codes');
    },
    codes: async () => {
      return await Codes.find().populate('comments')
    },
    singleCode: async (parent, { codeId }) => {
      return Codes.findOne({ _id: codeId });
    },
    comments: async () => {
      return await Comments.find({}).populate('user');
    },
    searchCodesByTitle: async (parent, { searchTerm }) => {
      return await Codes.find({
        title: { $regex: searchTerm, $options: 'i' },
      });
    },
    searchCodesByUsername: async (parent, { searchTerm }) => {
      return await Codes.find({
        username: { $regex: searchTerm, $options: 'i' },
      });
    }
  },
  Mutation: {
    addUser: async (parent, {firstName, lastName, username, email, password}) => {
      const user = await User.create({firstName, lastName, username, email, password});
      const token = signToken(user);
      return {token ,user};
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
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
      return Codes.findOneAndRemove({ _id: codeId })
    },
    updateCode: async (parent, { codeId, title, content, programmingLanguage }) => {
      return Codes.findOneAndUpdate(
        { _id: codeId },
        { $set: { title: title, content: content, programmingLanguage: programmingLanguage } },
        { new: true },
      );
    }
  },
};

module.exports = resolvers;
