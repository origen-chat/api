import { gql } from 'apollo-server-express';

export const AddChannelInput = gql`
  input AddChannelInput {
    name: String!
    workspaceId: ID!
  }
`;

export const AddChannelPayload = gql`
  type AddChannelPayload {
    channel: Channel!
  }
`;

export default [AddChannelInput, AddChannelPayload];
