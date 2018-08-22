import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

import { typeDefs as bookmarkedBookmarkablesTypeDefs } from './bookmarkedBookmarkables';
import { typeDefs as channelsTypeDefs } from './channels';
import { typeDefs as workspacesTypeDefs } from './workspaces';

export const User = gql`
  type User implements Node {
    id: ID!

    username: String!
    usernameIdentifier: String!

    email: Email!
    unverifiedEmail: Email

    firstName: String
    lastName: String

    workspaces(
      first: Int
      after: Cursor
      last: Int
      before: Cursor
    ): UserWorkspaceConnection!

    channels(
      workspaceId: ID!

      first: Int
      after: Cursor
      last: Int
      before: Cursor
    ): UserChannelConnection!

    bookmarkedBookmarkables(
      workspaceId: ID!

      first: Int
      after: Cursor
      last: Int
      before: Cursor
    ): UserBookmarkedBookmarkableConnection!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [
  User,
  ...workspacesTypeDefs,
  ...channelsTypeDefs,
  ...bookmarkedBookmarkablesTypeDefs,
];

export default typeDefs;
