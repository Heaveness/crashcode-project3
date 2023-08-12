import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CODE = gql`
  mutation addCodes($title: String!, $content: String!, $programmingLanguage: String!, $username: String!) {
    addCodes(title: $title, content: $content, programmingLanguage: $programmingLanguage, username: $username) {
      title
      content
      programmingLanguage
      username
    }
  }
`;