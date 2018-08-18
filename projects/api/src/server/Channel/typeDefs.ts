import { gql } from 'apollo-server-express';

const Channel = gql`
  type Channel implements Node {
    id: ID!

    name: String!
    workspace: Workspace!

    topic: String
    purpose: String
  }
`;

export default [Channel];
