import { ASTNode, GraphQLScalarType, Kind } from 'graphql';

import { types } from '../../../core';

const cursorResolver = new GraphQLScalarType({
  name: 'Cursor',
  serialize,
  parseValue,
  parseLiteral,
});

function serialize(cursor: types.Cursor): string {
  return cursor;
}

function parseValue(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  if (!isCursorValid(value)) {
    return undefined;
  }

  return value;
}

function parseLiteral(ast: ASTNode): string | undefined {
  if (ast.kind !== Kind.STRING) {
    return undefined;
  }

  if (!isCursorValid(ast.value)) {
    return undefined;
  }

  return ast.value;
}

function isCursorValid(value: string): boolean {
  let parsedValue: any;

  try {
    parsedValue = JSON.parse(value);
  } catch {
    return false;
  }

  if (typeof parsedValue !== 'object') {
    return false;
  }

  if (!parsedValue || !parsedValue.order || !Array.isArray(parsedValue.order)) {
    return false;
  }

  if (parsedValue.order.any((v: unknown) => typeof v !== 'string')) {
    return false;
  }

  return true;
}

export default cursorResolver;
