import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const Email = gql`
  """
  The \`Email\` scalar type represents an email address.
  """
  scalar Email
`;

const typeDefs: ReadonlyArray<DocumentNode> = [Email];

export default typeDefs;
