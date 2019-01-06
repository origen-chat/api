import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const Subscription = gql`
  type Subscription {
    messageReceived(workspaceId: ID!): Message!

    actorTyping(channelId: ID!): Actor!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [Subscription];

export default typeDefs;
