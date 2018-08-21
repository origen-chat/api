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
      after: String
      last: Int
      before: String
    ): ChannelMessageConnection!

    pinnedMessages(
      first: Int
      after: String
      last: Int
      before: String
    ): ChannelPinnedMessageConnection!

    members(
      first: Int
      after: String
      last: Int
      before: String
    ): ChannelMemberConnection!
  }
`;

export default [
  Channel,
  ...messagesTypeDefs,
  ...pinnedMessagesTypeDefs,
  ...membersTypeDefs,
];
