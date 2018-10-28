import * as core from '../../../core';

export type Node =
  | core.users.User
  | core.channels.Channel
  | core.workspaces.Workspace;

export enum NodeType {
  User = 'user',
  Channel = 'channel',
  Workspace = 'workspace',
}

export type NodeInfo = Readonly<{ type: NodeType; id: core.types.ID }>;

export type GlobalId = core.types.Base64;
