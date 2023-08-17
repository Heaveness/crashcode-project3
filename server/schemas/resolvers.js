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
    searchCodesByTitle: async (_, { searchTerm }) => {
      try {
        console.log("------- Title--------" + searchTerm)
        const codes = await Codes.find({ title: { $regex: searchTerm, $options: "i" } });
        console.log(codes);
        return codes;
      } catch (error) {
        console.error("Error searching by title:", error);
        throw error;
      }
    },
    searchCodesByUsername: async (parent, { searchTerm }) => {
      try {
        //console.log("------Username---------" + searchTerm);
      const data =  await Codes.find({  username: { $regex: searchTerm, $options: 'i' } });
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error searching by title:", error);
      throw error;
    }
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
    addComments: async (parent, {text, username}) => {
      const comments = await Comments.create({text, username});
      return comments;
    },
    addCodeToUser: async (parent, { _id, _ObjectId }) => {
      const codes =  await User.findOneAndUpdate(
        { _id: _id },
        { $push: { codes:   _ObjectId } },
        { new: true, runValidators: true }
      );
      console.log(codes);
      return codes;
      
    },
    addCommentToCode: async (parent, { _id, _ObjectId }) => {
      const comments =  await Codes.findOneAndUpdate(
        { _id: _id },
        { $push: { comments:   _ObjectId } },
        { new: true, runValidators: true }
      );
      console.log(comments);
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
