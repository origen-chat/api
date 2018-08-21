import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

import { typeDefs as stargazersTypeDefs } from './stargazers';

export const Starrable = gql`
  interface Starrable {
    stargazers(
      first: Int
      after: String
      last: Int
      before: String
    ): StarrableStargazerConnection!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [
  Starrable,
  ...stargazersTypeDefs,
];

export default typeDefs;
