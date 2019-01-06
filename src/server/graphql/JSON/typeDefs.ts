import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const JSON = gql`
  """
  The \`JSON\` scalar type represents
  JSON values as specified by
  [ECMA-404](http://www.ecma-international.org/
  publications/files/ECMA-ST/ECMA-404.pdf).
  """
  scalar JSON
`;

const typeDefs: ReadonlyArray<DocumentNode> = [JSON];

export default typeDefs;
