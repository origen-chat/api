/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Workspaces
// ====================================================

export interface Workspaces_viewer_workspaces_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
}

export interface Workspaces_viewer_workspaces_edges_node_defaultChannel {
  __typename: "Channel";
  id: string;
  name: string;
}

export interface Workspaces_viewer_workspaces_edges_node {
  __typename: "Workspace";
  id: string;
  name: string;
  defaultChannel: Workspaces_viewer_workspaces_edges_node_defaultChannel;
}

export interface Workspaces_viewer_workspaces_edges {
  __typename: "UserWorkspaceEdge";
  cursor: any;
  node: Workspaces_viewer_workspaces_edges_node;
}

export interface Workspaces_viewer_workspaces {
  __typename: "UserWorkspaceConnection";
  pageInfo: Workspaces_viewer_workspaces_pageInfo;
  edges: (Workspaces_viewer_workspaces_edges | null)[] | null;
}

export interface Workspaces_viewer {
  __typename: "User";
  workspaces: Workspaces_viewer_workspaces;
}

export interface Workspaces {
  viewer: Workspaces_viewer;
}
