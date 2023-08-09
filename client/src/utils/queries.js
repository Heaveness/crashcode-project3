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


