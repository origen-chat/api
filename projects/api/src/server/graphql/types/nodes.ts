import { channels, users, workspaces } from '../../../../core';

export type Node = users.User | channels.Channel | workspaces.Workspace;

export type NodeType = 'user' | 'channel' | 'workspace';

export type GlobalId = string;
