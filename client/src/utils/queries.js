import { gql } from '@apollo/client';

export const QUERY_CODES = gql`
  query getCodes {
    codes {
      _id
      title
      content
      programmingLanguage
      username
      createdAt
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    singleUser(userId: $userId) {
      _id
      username
      email
      codes {
        _id
        title
        content
        programmingLanguage
        username
        createdAt
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user {
    user {
      _id
      username
      email
      codes {
        _id
        title
        content
        programmingLanguage
        username
        createdAt
      }
    }
  }
`;

