import { gql } from 'apollo-server-express';

import { typeDefs as membersTypeDefs } from './members';
import { typeDefs as messagesTypeDefs } from './messages';
import { typeDefs as pinnedMessagesTypeDefs } from './pinnedMessages';

const Channel = gql`
  type Channel implements Node {
    id: ID!

    name: String!
    type: ChannelType!
    workspace: Workspace!

    topic: String
    purpose: String

    messages(
      first: Int
      after: Cursor
      last: Int
      before: Cursor
    ): ChannelMessageConnection!

    pinnedMessages(
      first: Int
      after: Cursor
      last: Int
      before: Cursor
    ): ChannelPinnedMessageConnection!

    members(
      first: Int
      after: Cursor
      last: Int
      before: Cursor
    ): ChannelMemberConnection!
  }
`;

export default [
  Channel,
  ...messagesTypeDefs,
  ...pinnedMessagesTypeDefs,
  ...membersTypeDefs,
];
