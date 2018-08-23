import { ASTNode, GraphQLScalarType, Kind } from 'graphql';

const emailRegex = /@/;

const emailResolver = new GraphQLScalarType({
  name: 'Email',
  serialize,
  parseValue,
  parseLiteral,
});

function serialize(email: string): string {
  return email;
}

function parseValue(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  if (!isEmailValid(value)) {
    return undefined;
  }

  return value;
}

function parseLiteral(ast: ASTNode): string | undefined {
  if (ast.kind !== Kind.STRING) {
    return undefined;
  }

  if (!isEmailValid(ast.value)) {
    return undefined;
  }

  return ast.value;
}

function isEmailValid(value: string): boolean {
  if (!emailRegex.test(value)) {
    return false;
  }

  return true;
}

export default emailResolver;
