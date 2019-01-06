import { gql } from 'apollo-server-express';

export const JoinNamedChannelInput = gql`
  input JoinNamedChannelInput {
    id: ID!
  }
`;

export const JoinNamedChannelPayload = gql`
  type JoinNamedChannelPayload {
    channel: Channel!
  }
`;

export default [JoinNamedChannelInput, JoinNamedChannelPayload];
