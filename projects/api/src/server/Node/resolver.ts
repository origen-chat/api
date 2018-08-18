import { channels, types, users, workspaces } from '../../core';

const nodeResolver = {
  __resolveType: resolveType,
};

export type Node = users.User | workspaces.Workspace | channels.Channel;

function resolveType(node: Node): types.Nullable<string> {
  return null;
}

export default nodeResolver;
