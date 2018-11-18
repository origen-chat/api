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
  const enhancedResolver: Resolver<any, any, any> = (
    parentOrRoot,
    args,
    context,
    info,
  ) => {
    const argsWithDecodedIds = decodeIdsInArgs(schema, args);

    const resolvedValue = resolver(
      parentOrRoot,
      argsWithDecodedIds,
      context,
      info,
    );

    return resolvedValue;
  };

  return enhancedResolver;
}

export function decodeIdsInArgs(schema: Schema, args: Args): Args {
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
  if (value === null || value === undefined) {
    return value;
  }

  if (schema[key]) {
    const schemaEntry = schema[key];

    if (isSchema(schemaEntry)) {
      return decodeIdsInArgs(schemaEntry as any, value);
    }

    let decodedIds;

    if (Array.isArray(value)) {
      decodedIds = value.map(globalId => decodeId(globalId));
    } else {
      decodedIds = [decodeId(value)];
    }

    if (Array.isArray(schemaEntry)) {
      if (decodedIds.some(decodedId => !schemaEntry.includes(decodedId.type))) {
        throw new ValidationError('invalid id');
      }

      if (Array.isArray(value)) {
        return decodedIds;
      }

      return decodedIds[0];
    }

    if (Array.isArray(value)) {
      return decodedIds.map(decodedId => decodedId.id);
    }

    return decodedIds[0].id;
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
