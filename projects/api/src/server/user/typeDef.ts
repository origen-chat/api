import { gql } from 'apollo-server-express';

export const User = gql`
  type User {
    id: ID!

    uniqueUsername: UniqueUsername!

    email: Email!
    unverifiedEmail: Email

    firstName: String
    lastName: String
  }
`;

export default User;
