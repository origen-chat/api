import { gql } from 'apollo-server-express';

const Query = gql`
  type Query {
    user(uniqueUsername: UniqueUsernameInput!): User!
  }
`;

export default Query;
