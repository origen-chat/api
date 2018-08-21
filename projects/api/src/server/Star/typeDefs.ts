import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const Star = gql`
  type Star implements Node {
    id: ID!

    author: User!
    starrable: Starrable!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [Star];

export default typeDefs;
