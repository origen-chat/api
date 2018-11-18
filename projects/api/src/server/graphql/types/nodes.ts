import * as core from '../../../core';

export type Node =
  | core.users.User
  | core.channels.Channel
  | core.workspaces.Workspace
  | core.messages.Message;

export enum NodeType {
  User = 'User',
  Channel = 'Channel',
  Workspace = 'Workspace',
  Message = 'Message',
}

export type NodeInfo = Readonly<{ type: NodeType; id: core.types.ID }>;

export type GlobalId = core.types.Base64;
