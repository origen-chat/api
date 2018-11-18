import { Resolver } from '../../../types';
import { encodeId } from '../../helpers';
import { GlobalId, Node } from '../../types';

export const resolveNodeId: Resolver<Node, any, GlobalId> = (
  parent,
  args,
  context,
  info,
) => {
  const globalId = encodeId({
    type: info.parentType.name,
    id: parent.id,
  });

  return globalId;
};
