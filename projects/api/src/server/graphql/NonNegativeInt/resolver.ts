import { ASTNode, GraphQLScalarType, Kind } from 'graphql';

import { types } from '../../../core';

const nonNegativeIntResolver = new GraphQLScalarType({
  name: 'NonNegativeInt',
  serialize,
  parseValue,
  parseLiteral,
});

function serialize(nonNegativeInteger: types.NonNegativeInteger): number {
  return nonNegativeInteger;
}

function parseValue(value: unknown): types.NonNegativeInteger | undefined {
  if (typeof value !== 'number') {
    return undefined;
  }

  if (!isNonNegativeIntegerValid(value)) {
    return undefined;
  }

  return value;
}

function parseLiteral(ast: ASTNode): types.NonNegativeInteger | undefined {
  if (ast.kind !== Kind.INT) {
    return undefined;
  }

  const parsedValue = parseInt(ast.value, 10);

  if (!isNonNegativeIntegerValid(parsedValue)) {
    return undefined;
  }

  return parsedValue;
}

function isNonNegativeIntegerValid(nonNegativeInteger: number): boolean {
  if (!Number.isSafeInteger(nonNegativeInteger)) {
    return false;
  }

  if (nonNegativeInteger < 0) {
    return false;
  }

  return true;
}

export default nonNegativeIntResolver;
