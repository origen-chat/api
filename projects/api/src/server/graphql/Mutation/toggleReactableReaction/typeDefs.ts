import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const ToggleReactableReactionInput = gql`
  input ToggleReactableReactionInput {
    name: String!
  }
`;

export const ToggleReactableReactionPayload = gql`
  type ToggleReactableReactionPayload {
    reaction: Reaction!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [
  ToggleReactableReactionInput,
  ToggleReactableReactionPayload,
];

export default typeDefs;
