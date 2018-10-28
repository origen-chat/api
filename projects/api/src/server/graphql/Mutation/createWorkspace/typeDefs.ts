import { gql } from 'apollo-server-express';

export const CreateWorkspaceInput = gql`
  input CreateWorkspaceInput {
    name: String!
    displayName: String!
    description: String
  }
`;

export const CreateWorkspacePayload = gql`
  type CreateWorkspacePayload {
    workspace: Workspace!
  }
`;

export default [CreateWorkspaceInput, CreateWorkspacePayload];
