import { gql } from 'apollo-server-express';

import { typeDefs as channelsTypeDefs } from './channels';
import { typeDefs as membersTypeDefs } from './members';

const Workspace = gql`
  type Workspace implements Node {
    id: ID!

    name: String!
    description: String

    channel(name: String!): Channel!
    channels(
      first: Int
      after: Cursor
      last: Int
      before: Cursor
    ): WorkspaceChannelConnection!

    defaultChannel: Channel!

    members(
      first: Int
      after: Cursor
      last: Int
      before: Cursor
    ): WorkspaceMemberConnection!
  }
`;

export default [Workspace, ...channelsTypeDefs, ...membersTypeDefs];
