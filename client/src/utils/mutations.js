import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
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
      _id
      title
      content
      programmingLanguage
      username
    }
  }
`;

export const DELETE_CODE = gql`
  mutation deleteCode($codeId: ID!) {
    deleteCode(codeId: $codeId) {
      _id
    }
  }
  `;

export const UPDATE_CODE = gql`
  mutation updateCode($codeId: ID!, $title: String!, $content: String! $programmingLanguage: String!) {
    updateCode(codeId: $codeId, title: $title, content: $content, programmingLanguage: $programmingLanguage) {
      title
      content
      programmingLanguage
    }
  }
  `;
// export const DELETE_COMMENT = gql`
//   mutation deleteComment($codeId: ID!, $commentId: ID!) {
//     deleteComment(codeId: $codeId, commentId: $commentId) {
//       _id
//       }
//     }
//     `


export const ADD_COMMENTS = gql`
  mutation addComments(  $text: String!, $username: String!) {
    addComments( text: $text, username: $username) {
      _id
      text
      username
      createdAt
    }
  }`;  


export const ADD_COMMENT_TO_CODE = gql`
  mutation addCommentToCode( $_id: String!, $_ObjectId: String!) {
    addCommentToCode( _id: $_id, _ObjectId: $_ObjectId) {
      title
    }
  }`;

export const ADD_CODE_TO_USER = gql`
  mutation addCodeToUser( $_id: String!, $_ObjectId: String!) {
    addCodeToUser( _id: $_id, _ObjectId: $_ObjectId) {
      username
    }
  }`;