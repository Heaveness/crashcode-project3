const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    codes: [Codes]
  }

  type Codes {
    _id: ID!
    title: String!
    content: String!
    username: String!
    programmingLanguage: String!
    createdAt: String!
    comments: [Comments]
  }

  type Comments {
    _id: ID!
    text: String!
    createdAt: String!
    username: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: [User]
    singleUser(userId: ID!): User
    codes: [Codes]
    singleCode(codeId: ID!): Codes
    comments: [Comments]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addCodes(title: String!, content: String!, programmingLanguage: String! username: String!): Codes
    addComments(text: String!, username: String!): Comments
    deleteCode(codeId: ID!): Codes
    updateCode(codeId: ID!, content: String!): Codes
  }
`;

module.exports = typeDefs;
