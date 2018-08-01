import { gql } from 'apollo-server-express';

const Query = gql`
  type Query {
    user(username: String!): User!
  }
`;

export default Query;
