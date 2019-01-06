import { gql } from 'apollo-server-express';

const Node = gql`
  interface Node {
    id: ID!
  }
`;

export default [Node];
