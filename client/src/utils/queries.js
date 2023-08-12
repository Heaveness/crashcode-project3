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
    user(userId: $userId) {
      _id
      firstName
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      username
      skills
    }
  }
`;

