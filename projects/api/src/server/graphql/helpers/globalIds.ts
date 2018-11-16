import * as core from '../../../core';
import { Resolver } from '../../types';
import { ValidationError } from '../errors';
import { GlobalId, NodeType } from '../types';
import { NodeInfo } from '../types/nodes';

interface Schema {
  readonly [key: string]: SchemaEntry;
}

type SchemaEntry = NodeType | ReadonlyArray<NodeType> | Schema;

type Args = Readonly<Record<string, any>>;

export function withDecodedGlobalIds(
  schema: Schema,
  resolver: Resolver<any, any, any>,
): Resolver<any, any, any> {
  const enhancedResolver: Resolver<any, any, any> = async (
    parentOrRoot,
    args,
    context,
    info,
  ) => {
    const argsWithDecodedIds = decodeIds(schema, args);

    const returnedValue = await resolver(
      parentOrRoot,
      argsWithDecodedIds,
      context,
      info,
    );

    return returnedValue;
  };

  return enhancedResolver;
}

export function decodeIds(schema: Schema, args: Args): Args {
  const argsWithParsedIds = Object.entries(args).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: maybeDecodeId(schema, key, value),
    }),
    {},
  );

  return argsWithParsedIds;
}

export const globalIdSeparator = ':';

function maybeDecodeId(schema: Schema, key: string, value: any): any {
  if (schema[key]) {
    const schemaEntry = schema[key];

    if (isSchema(schemaEntry)) {
      return decodeIds(schemaEntry as any, value);
    }

    const decodedId = decodeId(value);

    if (Array.isArray(schemaEntry)) {
      if (!schemaEntry.includes(decodedId.type)) {
        throw new ValidationError('invalid id');
      }

      return decodedId;
    }

    return decodedId.id;
  }

  return value;
}

function isSchema(value: any): value is Schema {
  if (typeof value === 'object' && !Array.isArray(value)) {
    return true;
  }

  return false;
}

export function decodeId(globalId: GlobalId): NodeInfo {
  const [type, idString] = core.helpers
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
  const globalId = core.helpers.encodeBase64(
    `${type}${globalIdSeparator}${id}`,
  );

  return globalId;
}
