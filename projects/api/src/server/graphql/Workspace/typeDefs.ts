import { gql } from 'apollo-server-express';

import { typeDefs as channelsTypeDefs } from './channels';
import { typeDefs as membersTypeDefs } from './members';

const Workspace = gql`
  type Workspace implements Node {
    id: ID!

    name: String!
    displayName: String!
    description: String

    channel(name: String!): Channel!
    channels(
      first: NonNegativeInt
      after: Cursor
      last: NonNegativeInt
      before: Cursor
    ): WorkspaceChannelConnection!

    defaultChannel: Channel!

    members(
      first: NonNegativeInt
      after: Cursor
      last: NonNegativeInt
      before: Cursor
    ): WorkspaceMemberConnection!
  }
`;

export default [Workspace, ...channelsTypeDefs, ...membersTypeDefs];
