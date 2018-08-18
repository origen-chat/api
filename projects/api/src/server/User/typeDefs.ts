import { gql } from 'apollo-server-express';

export const User = gql`
  type User implements Node {
    id: ID!

    username: String!
    usernameIdentifier: String!

    email: Email!
    unverifiedEmail: Email

    firstName: String
    lastName: String
  }
`;

export default [User];
