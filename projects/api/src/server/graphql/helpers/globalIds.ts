import { helpers, types } from '../../../core';
import { ValidationError } from '../errors';
import { GlobalId, NodeType } from '../types';
import { NodeInfo } from '../types/nodes';

type Schema<TIDKeys extends string> = Readonly<
  Record<TIDKeys, NodeType | ReadonlyArray<NodeType>>
>;

type Args<
  TIDKeys extends string = never,
  TIDTypes extends GlobalId | types.ID = GlobalId
> = Readonly<{ [key in TIDKeys]: TIDTypes } & { [key: string]: any }>;

type ParsedIds<TIDKeys extends string> = Args<TIDKeys, number>;

export function decodeIds<TIDKeys extends string>(
  schema: Schema<TIDKeys>,
  args: Args<TIDKeys>,
): ParsedIds<TIDKeys> {
  const argsWithParsedIds = Object.entries(args).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: maybeDecodeId(schema, key, value),
    }),
    {},
  ) as ParsedIds<TIDKeys>;

  return argsWithParsedIds;
}

export const globalIdSeparator = ':';

function maybeDecodeId<TIDKeys extends string>(
  schema: Schema<TIDKeys>,
  key: string,
  value: any,
): any {
  // @ts-ignore
  if (schema[key]) {
    return decodeId(value);
  }

  return value;
}

export function decodeId(globalId: GlobalId): NodeInfo {
  const [type, idString] = helpers
    .decodeBase64(globalId)
    .split(globalIdSeparator);

  if (!isNodeType(type)) {
    throw new ValidationError('invalid id');
  }

  const id = Number.parseInt(idString, 10);

  const nodeInfo: NodeInfo = { type, id };

  return nodeInfo;
}

export function isNodeType(nodeType: string): nodeType is NodeType {
  const validNodeTypes = Object.values(NodeType);

  if (!validNodeTypes.includes(nodeType)) {
    return false;
  }

  return true;
}

export function encodeId({ type, id }: NodeInfo): GlobalId {
  const globalId = helpers.encodeBase64(`${type}${globalIdSeparator}${id}`);

  return globalId;
}
