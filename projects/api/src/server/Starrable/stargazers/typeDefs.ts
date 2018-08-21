import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const StarrableStargazerConnection = gql`
  type StarrableStargazerConnection {
    pageInfo: PageInfo!
    totalCount: Int!
    edges: [StarrableStargazerEdge]
  }
`;

const StarrableStargazerEdge = gql`
  type StarrableStargazerEdge {
    cursor: String!
    node: User!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [
  StarrableStargazerConnection,
  StarrableStargazerEdge,
];

export default typeDefs;
