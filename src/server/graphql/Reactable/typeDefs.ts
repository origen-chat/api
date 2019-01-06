import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

import { typeDefs as reactionsTypeDefs } from './reactions';

export const Reactable = gql`
  interface Reactable {
    id: ID!

    reactions(
      first: NonNegativeInt
      after: Cursor
      last: NonNegativeInt
      before: Cursor
    ): ReactableReactionConnection!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [Reactable, ...reactionsTypeDefs];

export default typeDefs;
