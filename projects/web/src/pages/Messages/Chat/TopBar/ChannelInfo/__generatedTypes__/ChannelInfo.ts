/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ChannelType } from "./../../../../../../../__generatedTypes__/globalTypes";

// ====================================================
// GraphQL query operation: ChannelInfo
// ====================================================

export interface ChannelInfo_workspace_channel_members_edges_node {
  __typename: "User";
  id: string;
  username: string;
  usernameIdentifier: string;
}

export interface ChannelInfo_workspace_channel_members_edges {
  __typename: "ChannelMemberEdge";
  node: ChannelInfo_workspace_channel_members_edges_node;
}

export interface ChannelInfo_workspace_channel_members {
  __typename: "ChannelMemberConnection";
  edges: (ChannelInfo_workspace_channel_members_edges | null)[] | null;
}

export interface ChannelInfo_workspace_channel {
  __typename: "Channel";
  id: string;
  type: ChannelType;
  name: string;
  members: ChannelInfo_workspace_channel_members;
}

export interface ChannelInfo_workspace {
  __typename: "Workspace";
  id: string;
  name: string;
  displayName: string;
  channel: ChannelInfo_workspace_channel;
}

export interface ChannelInfo {
  workspace: ChannelInfo_workspace;
}

export interface ChannelInfoVariables {
  workspaceId: string;
  channelId: string;
}
