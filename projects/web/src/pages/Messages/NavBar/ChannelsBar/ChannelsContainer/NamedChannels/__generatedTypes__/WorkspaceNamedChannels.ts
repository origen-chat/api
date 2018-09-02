/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WorkspaceNamedChannels
// ====================================================

export interface WorkspaceNamedChannels_viewer_channels_edges_node {
  __typename: "Channel";
  id: string;
  name: string;
  viewerHasUnreadMessages: boolean;
}

export interface WorkspaceNamedChannels_viewer_channels_edges {
  __typename: "UserChannelEdge";
  node: WorkspaceNamedChannels_viewer_channels_edges_node;
}

export interface WorkspaceNamedChannels_viewer_channels {
  __typename: "UserChannelConnection";
  edges: (WorkspaceNamedChannels_viewer_channels_edges | null)[] | null;
}

export interface WorkspaceNamedChannels_viewer {
  __typename: "User";
  channels: WorkspaceNamedChannels_viewer_channels;
}

export interface WorkspaceNamedChannels {
  viewer: WorkspaceNamedChannels_viewer;
}

export interface WorkspaceNamedChannelsVariables {
  workspaceName: string;
}
