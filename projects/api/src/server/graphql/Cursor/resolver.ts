import { ASTNode, GraphQLScalarType, Kind } from 'graphql';

import * as core from '../../../core';

const cursorResolver = new GraphQLScalarType({
  name: 'Cursor',
  serialize,
  parseValue,
  parseLiteral,
});

function serialize(cursor: core.types.Cursor): string {
  return cursor;
}

function parseValue(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  if (!core.helpers.isCursor(value)) {
    return undefined;
  }

  return value;
}

function parseLiteral(ast: ASTNode): string | undefined {
  if (ast.kind !== Kind.STRING) {
    return undefined;
  }

  if (!core.helpers.isCursor(ast.value)) {
    return undefined;
  }

  return ast.value;
}

export default cursorResolver;
