import { gql } from 'apollo-server-express';

const Query = gql`
  type Query {
    user(uniqueUsername: UniqueUsername!): User!
  }
`;

export default Query;
