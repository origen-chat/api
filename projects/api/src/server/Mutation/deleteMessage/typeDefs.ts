import { gql } from 'apollo-server-express';

export const DeleteMessageInput = gql`
  input DeleteMessageInput {
    id: ID!
  }
`;

export const DeleteMessagePayload = gql`
  type DeleteMessagePayload {
    message: Message!
  }
`;

export default [DeleteMessageInput, DeleteMessagePayload];
