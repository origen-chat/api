import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const Reaction = gql`
  type Reaction implements Node {
    id: ID!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [Reaction];

export default typeDefs;
