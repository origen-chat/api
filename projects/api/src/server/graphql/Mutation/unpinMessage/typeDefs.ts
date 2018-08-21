import { gql } from 'apollo-server-express';

export const UnpinMessageInput = gql`
  input UnpinMessageInput {
    channelId: ID!
    messageId: ID!
  }
`;

export const UnpinMessagePayload = gql`
  type UnpinMessagePayload {
    message: Message!
  }
`;

export default [UnpinMessageInput, UnpinMessagePayload];
