import { gql } from 'apollo-server-express';

export const User = gql`
  type User {
    id: ID!
    username: String
  }
`;

export default User;
