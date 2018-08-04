import { gql } from 'apollo-server-express';

const UniqueUsernameInput = gql`
  input UniqueUsernameInput {
    username: String!
    usernameIdentifier: String!
  }
`;

export default UniqueUsernameInput;
