import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const Cursor = gql`
  """
  The \`Cursor\` scalar type represents a cursor pointing to a node.
  """
  scalar Cursor
`;

const typeDefs: ReadonlyArray<DocumentNode> = [Cursor];

export default typeDefs;
