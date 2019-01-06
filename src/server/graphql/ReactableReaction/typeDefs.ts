import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const ReactableReaction = gql`
  type ReactableReaction implements Node {
    id: ID!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [ReactableReaction];

export default typeDefs;
