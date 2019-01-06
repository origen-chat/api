import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const RemoveReactionInput = gql`
  input RemoveReactionInput {
    id: ID!
  }
`;

export const RemoveReactionPayload = gql`
  type RemoveReactionPayload {
    reaction: Reaction!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [
  RemoveReactionInput,
  RemoveReactionPayload,
];

export default typeDefs;
