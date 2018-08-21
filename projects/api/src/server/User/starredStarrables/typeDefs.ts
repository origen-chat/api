import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const UserStarredStarrableConnection = gql`
  type UserStarredStarrableConnection {
    pageInfo: PageInfo!
    totalCount: Int!
    edges: [UserStarredStarrableEdge]
  }
`;

const UserStarredStarrableEdge = gql`
  type UserStarredStarrableEdge {
    cursor: String!
    node: Star!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [
  UserStarredStarrableConnection,
  UserStarredStarrableEdge,
];

export default typeDefs;
