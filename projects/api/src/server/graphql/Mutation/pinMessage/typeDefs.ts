import { gql } from 'apollo-server-express';

export const PinMessageInput = gql`
  input PinMessageInput {
    channelId: ID!
    messageId: ID!
  }
`;

export const PinMessagePayload = gql`
  type PinMessagePayload {
    message: Message!
  }
`;

export default [PinMessageInput, PinMessagePayload];
