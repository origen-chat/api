import { gql } from 'apollo-server-express';

export const UpdateWorkspaceInput = gql`
  input UpdateWorkspaceInput {
    name: String
    description: String
  }
`;

export const UpdateWorkspacePayload = gql`
  type UpdateWorkspacePayload {
    workspace: Workspace!
  }
`;

export default [UpdateWorkspaceInput, UpdateWorkspacePayload];
