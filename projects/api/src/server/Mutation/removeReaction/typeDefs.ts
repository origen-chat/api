import { gql } from 'apollo-server-express';

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

export default [RemoveReactionInput, RemoveReactionPayload];
