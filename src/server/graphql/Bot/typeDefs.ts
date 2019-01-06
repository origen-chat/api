import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const Bot = gql`
  type Bot implements Node & Actor {
    id: ID!

    username: String!

    app: App!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [Bot];

export default typeDefs;
