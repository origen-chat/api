import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

import { typeDefs as responsesTypeDefs } from './responses';

const Message = gql`
  type Message implements Node & Reactable & Bookmarkable {
    id: ID!

    sender: User!
    channel: Channel!

    reactions(
      first: Int
      after: Cursor
      last: Int
      before: Cursor
    ): ReactableReactionConnection!

    parentMessage: Message

    responses(
      first: Int
      after: Cursor
      last: Int
      before: Cursor
    ): MessageResponseConnection!

    viewerCanBookmark: Boolean!
    viewerHasBookmarked: Boolean!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [Message, ...responsesTypeDefs];

export default typeDefs;
