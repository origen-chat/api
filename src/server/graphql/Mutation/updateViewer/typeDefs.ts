import { gql } from 'apollo-server-express';

export const UpdateViewerInput = gql`
  input UpdateViewerInput {
    username: String
    email: Email
  }
`;

export const UpdateViewerPayload = gql`
  type UpdateViewerPayload {
    user: User!
  }
`;

export default [UpdateViewerInput, UpdateViewerPayload];
