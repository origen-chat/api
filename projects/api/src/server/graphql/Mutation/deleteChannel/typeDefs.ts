import { gql } from 'apollo-server-express';

export const DeleteChannelInput = gql`
  input DeleteChannelInput {
    id: ID!
  }
`;

export const DeleteChannelPayload = gql`
  type DeleteChannelPayload {
    channel: Channel!
  }
`;

export default [DeleteChannelInput, DeleteChannelPayload];
