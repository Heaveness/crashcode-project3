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

  type Query {
    user: [User]
    codes: [Codes]
    comments: [Comments]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): User
    addCodes(title: String!, content: String!, programmingLanguage: String! username: String!): Codes
    addComments(text: String!, username: String!): Comments
    deleteCode(codeId: ID!): Codes
    updateCode(codeId: ID!, content: String!): Codes
  }
`;

module.exports = typeDefs;
