import { gql } from 'apollo-server-express';

export const UpdateChannelInput = gql`
  input UpdateChannelInput {
    name: String
  }
`;

export const UpdateChannelPayload = gql`
  type UpdateChannelPayload {
    channel: Channel!
  }
`;

export default [UpdateChannelInput, UpdateChannelPayload];
