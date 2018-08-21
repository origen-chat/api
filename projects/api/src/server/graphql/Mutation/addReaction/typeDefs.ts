import { gql } from 'apollo-server-express';

export const AddReactionInput = gql`
  input AddReactionInput {
    reactableId: ID!
  }
`;

export const AddReactionPayload = gql`
  type AddReactionPayload {
    reaction: Reaction!
  }
`;

export default [AddReactionInput, AddReactionPayload];
