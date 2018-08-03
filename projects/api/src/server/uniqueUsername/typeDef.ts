import { gql } from 'apollo-server-express';

const UniqueUsername = gql`
  type UniqueUsername {
    username: String!
    usernameIdentifier: String!
  }
`;

export default UniqueUsername;
