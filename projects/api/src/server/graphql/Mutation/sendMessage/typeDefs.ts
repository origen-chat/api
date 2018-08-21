import { gql } from 'apollo-server-express';

export const SendMessageInput = gql`
  input SendMessageInput {
    channelId: ID!
  }
`;

export const SendMessagePayload = gql`
  type SendMessagePayload {
    message: Message!
  }
`;

export default [SendMessageInput, SendMessagePayload];
