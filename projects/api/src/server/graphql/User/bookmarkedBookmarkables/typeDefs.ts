import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const UserBookmarkedBookmarkableConnection = gql`
  type UserBookmarkedBookmarkableConnection {
    pageInfo: PageInfo!
    totalCount: Int!
    edges: [UserBookmarkedBookmarkableEdge]
  }
`;

const UserBookmarkedBookmarkableEdge = gql`
  type UserBookmarkedBookmarkableEdge {
    cursor: Cursor!
    node: Bookmark!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [
  UserBookmarkedBookmarkableConnection,
  UserBookmarkedBookmarkableEdge,
];

export default typeDefs;
