import { gql } from 'apollo-server-express';

export const EditMessageInput = gql`
  input EditMessageInput {
    messageId: ID!
  }
`;

export const EditMessagePayload = gql`
  type EditMessagePayload {
    message: Message!
  }
`;

export default [EditMessageInput, EditMessagePayload];
