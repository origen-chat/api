import { gql } from 'apollo-server-express';

export const EditMessageInput = gql`
  input EditMessageInput {
    messageId: ID!
    content: JSON
  }
`;

export const EditMessagePayload = gql`
  type EditMessagePayload {
    message: Message!
  }
`;

export default [EditMessageInput, EditMessagePayload];
