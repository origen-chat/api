import { gql } from 'apollo-server-express';

export const LeaveChannelInput = gql`
  input LeaveChannelInput {
    id: ID!
  }
`;

export const LeaveChannelPayload = gql`
  type LeaveChannelPayload {
    channel: Channel!
  }
`;

export default [LeaveChannelInput, LeaveChannelPayload];
