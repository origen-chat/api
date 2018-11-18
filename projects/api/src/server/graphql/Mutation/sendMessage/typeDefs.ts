import { gql } from 'apollo-server-express';

export const SendMessageInput = gql`
  input SendMessageInput {
    channelId: ID!
    parentMessageId: ID
    content: JSON!
  }
`;

export const SendMessagePayload = gql`
  type SendMessagePayload {
    message: Message!
  }
`;

export default [SendMessageInput, SendMessagePayload];
