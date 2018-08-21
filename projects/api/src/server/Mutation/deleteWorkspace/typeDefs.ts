import { gql } from 'apollo-server-express';

export const DeleteWorkspaceInput = gql`
  input DeleteWorkspaceInput {
    id: ID!
  }
`;

export const DeleteWorkspacePayload = gql`
  type DeleteWorkspacePayload {
    workspace: Workspace!
  }
`;

export default [DeleteWorkspaceInput, DeleteWorkspacePayload];
