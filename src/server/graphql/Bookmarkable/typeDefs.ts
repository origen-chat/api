import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const Bookmarkable = gql`
  interface Bookmarkable {
    id: ID!

    viewerCanBookmark: Boolean!
    viewerHasBookmarked: Boolean!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [Bookmarkable];

export default typeDefs;
