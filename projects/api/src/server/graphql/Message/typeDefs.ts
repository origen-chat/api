import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

import { typeDefs as responsesTypeDefs } from './responses';

const Message = gql`
  type Message implements Node & Reactable & Starrable {
    id: ID!

    sender: User!
    channel: Channel!

    reactions(
      first: Int
      after: String
      last: Int
      before: String
    ): ReactableReactionConnection!

    parentMessage: Message

    responses(
      first: Int
      after: String
      last: Int
      before: String
    ): MessageResponseConnection!

    stargazers(
      first: Int
      after: String
      last: Int
      before: String
    ): StarrableStargazerConnection!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [Message, ...responsesTypeDefs];

export default typeDefs;
