import { gql } from 'apollo-server-express';

export const CreateNamedChannelInput = gql`
  input CreateNamedChannelInput {
    name: String!
    workspaceId: ID!
  }
`;

export const CreateNamedChannelPayload = gql`
  type CreateNamedChannelPayload {
    channel: Channel!
  }
`;

export default [CreateNamedChannelInput, CreateNamedChannelPayload];
