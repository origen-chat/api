import { gql } from 'apollo-server-express';

export const AddReactionInput = gql`
  input AddReactionInput {
    name: String!
  }
`;

export const AddReactionPayload = gql`
  type AddReactionPayload {
    reaction: Reaction!
  }
`;

export default [AddReactionInput, AddReactionPayload];
