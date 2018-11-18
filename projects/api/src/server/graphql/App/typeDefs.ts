import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

import { typeDefs as botsTypeDefs } from './bots';

export const App = gql`
  type App implements Node {
    id: ID!

    bots(
      first: NonNegativeInt
      after: Cursor
      last: NonNegativeInt
      before: Cursor
    ): AppBotConnection!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [App, ...botsTypeDefs];

export default typeDefs;
