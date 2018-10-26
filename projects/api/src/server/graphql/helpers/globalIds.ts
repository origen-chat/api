import { types } from '../../../core';
import { GlobalId, NodeType } from '../types';

type Schema<TIDKeys extends string> = Readonly<
  Record<TIDKeys, NodeType | ReadonlyArray<NodeType>>
>;

type Args<
  TIDKeys extends string = never,
  TIDTypes extends GlobalId | types.ID = GlobalId
> = Readonly<{ [key in TIDKeys]: TIDTypes } & { [key: string]: any }>;

type ParsedIds<TIDKeys extends string> = Args<TIDKeys, number>;

export function parseIds<TIDKeys extends string>(
  schema: Schema<TIDKeys>,
  args: Args<TIDKeys>,
): ParsedIds<TIDKeys> {
  const argsWithParsedIds = Object.entries(args).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: maybeParseId(schema, key, value),
    }),
    {},
  ) as ParsedIds<TIDKeys>;

  return argsWithParsedIds;
}

const globalIdSeparator = ':';

function maybeParseId<TIDKeys extends string>(
  schema: Schema<TIDKeys>,
  key: string,
  value: any,
): any {
  // @ts-ignore
  if (schema[key]) {
    return parseId(value);
  }

  return value;
}

export function parseId(globalId: GlobalId): types.ID {
  const globalIdParts = globalId.split(globalIdSeparator);

  const parsedId = parseInt(globalIdParts[1], 10);

  return parsedId;
}
