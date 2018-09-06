/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Workspace
// ====================================================

export interface Workspace_workspace {
  __typename: "Workspace";
  id: string;
  name: string;
  displayName: string;
}

export interface Workspace {
  workspace: Workspace_workspace;
}

export interface WorkspaceVariables {
  workspaceId: string;
}
