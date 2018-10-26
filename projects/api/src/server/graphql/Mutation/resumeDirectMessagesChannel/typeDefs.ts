import { gql } from 'apollo-server-express';

export const ResumeDirectMessagesChannelInput = gql`
  input ResumeDirectMessagesChannelInput {
    workspaceId: ID!
    memberIds: [ID!]!
  }
`;

export const ResumeDirectMessagesChannelPayload = gql`
  type ResumeDirectMessagesChannelPayload {
    channel: Channel!
  }
`;

export default [
  ResumeDirectMessagesChannelInput,
  ResumeDirectMessagesChannelPayload,
];
