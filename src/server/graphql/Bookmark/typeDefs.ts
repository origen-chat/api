import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const Bookmark = gql`
  type Bookmark implements Node {
    id: ID!

    author: User!
    bookmarkable: Bookmarkable!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [Bookmark];

export default typeDefs;
