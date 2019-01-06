import * as core from '../../../core';
import { Node, NodeType } from '../types';

const nodeResolver = {
  __resolveType: resolveType,
};

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
