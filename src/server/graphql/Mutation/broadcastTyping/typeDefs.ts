import { gql } from 'apollo-server-express';

export const BroadcastTypingInput = gql`
  input BroadcastTypingInput {
    channelId: ID!
  }
`;

export const BroadcastTypingPayload = gql`
  type BroadcastTypingPayload {
    channel: Channel!
  }
`;

export default [BroadcastTypingInput, BroadcastTypingPayload];
