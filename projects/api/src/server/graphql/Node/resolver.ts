import * as core from '../../../core';
import { NodeType } from '../types';

const nodeResolver = {
  __resolveType: resolveType,
};

export type Node =
  | core.users.User
  | core.workspaces.Workspace
  | core.channels.Channel
  | core.messages.Message;

function resolveType(node: Node): core.types.Nullable<string> {
  if (core.users.isUser(node)) {
    return NodeType.User;
  }

  if (core.messages.isMessage(node)) {
    return NodeType.Message;
  }

  return null;
}

export default nodeResolver;
