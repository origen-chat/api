import { gql } from 'apollo-server-express';

export const JoinChannelInput = gql`
  input JoinChannelInput {
    id: ID!
  }
`;

export const JoinChannelPayload = gql`
  type JoinChannelPayload {
    channel: Channel!
  }
`;

export default [JoinChannelInput, JoinChannelPayload];
