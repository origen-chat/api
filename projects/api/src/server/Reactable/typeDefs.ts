import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

import { typeDefs as reactionsTypeDefs } from './reactions';

export const Reactable = gql`
  interface Reactable {
    reactions(
      first: Int
      after: String
      last: Int
      before: String
    ): ReactableReactionConnection!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [Reactable, ...reactionsTypeDefs];

export default typeDefs;
