import { ASTNode, GraphQLScalarType, Kind } from 'graphql';

const emailRegex = /@/;

const emailResolver = new GraphQLScalarType({
  name: 'Email',
  description: 'The `Email` scalar type represents an email address.',

  serialize,
  parseValue,
  parseLiteral,
});

function serialize(email: string): string {
  return email;
}

function parseValue(value: unknown): string {
  if (typeof value !== 'string') {
    throw new TypeError('expected value to be string');
  }

  if (!emailRegex.test(value)) {
    throw new TypeError('value is not valid email address');
  }

  return value;
}

function parseLiteral(ast: ASTNode): string {
  if (ast.kind !== Kind.STRING) {
    throw new TypeError('expected value to be string');
  }

  if (!emailRegex.test(ast.value)) {
    throw new TypeError('value is not valid email address');
  }

  return ast.value;
}

export default emailResolver;
