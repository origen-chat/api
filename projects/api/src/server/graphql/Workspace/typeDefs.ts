import { gql } from 'apollo-server-express';

import { typeDefs as channelsTypeDefs } from './channels';
import { typeDefs as membersTypeDefs } from './members';

const Workspace = gql`
  type Workspace implements Node {
    id: ID!

    name: String!
    displayName: String!
    description: String

    channel(id: ID!): Channel!
    channels(
      first: NonNegativeInt
      after: Cursor
      last: NonNegativeInt
      before: Cursor
    ): WorkspaceChannelConnection!

    defaultChannel: Channel!

    member(id: ID, username: String, usernameIdentifier: String): User!
    members(
      first: NonNegativeInt
      after: Cursor
      last: NonNegativeInt
      before: Cursor
    ): WorkspaceMemberConnection!
  }
`;

export default [Workspace, ...channelsTypeDefs, ...membersTypeDefs];
