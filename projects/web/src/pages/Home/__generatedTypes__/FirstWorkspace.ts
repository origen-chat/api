/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FirstWorkspace
// ====================================================

export interface FirstWorkspace_viewer_workspaces_edges_node_defaultChannel {
  __typename: "Channel";
  id: string;
  name: string;
}

export interface FirstWorkspace_viewer_workspaces_edges_node {
  __typename: "Workspace";
  id: string;
  name: string;
  defaultChannel: FirstWorkspace_viewer_workspaces_edges_node_defaultChannel;
}

export interface FirstWorkspace_viewer_workspaces_edges {
  __typename: "UserWorkspaceEdge";
  node: FirstWorkspace_viewer_workspaces_edges_node;
}

export interface FirstWorkspace_viewer_workspaces {
  __typename: "UserWorkspaceConnection";
  totalCount: any;
  edges: (FirstWorkspace_viewer_workspaces_edges | null)[] | null;
}

export interface FirstWorkspace_viewer {
  __typename: "User";
  workspaces: FirstWorkspace_viewer_workspaces;
}

export interface FirstWorkspace {
  viewer: FirstWorkspace_viewer;
}
