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

    viewerHasUnreadMessages: Boolean!

    messages(
      first: NonNegativeInt
      after: Cursor
      last: NonNegativeInt
      before: Cursor
    ): ChannelMessageConnection!

    pinnedMessages(
      first: NonNegativeInt
      after: Cursor
      last: NonNegativeInt
      before: Cursor
    ): ChannelPinnedMessageConnection!

    members(
      first: NonNegativeInt
      after: Cursor
      last: NonNegativeInt
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
