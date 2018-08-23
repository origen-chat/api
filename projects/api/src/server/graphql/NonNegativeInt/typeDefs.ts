import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const NonNegativeInt = gql`
  """
  The \`NonNegativeInt\` scalar type represents a non-negative integer.
  """
  scalar NonNegativeInt
`;

const typeDefs: ReadonlyArray<DocumentNode> = [NonNegativeInt];

export default typeDefs;
