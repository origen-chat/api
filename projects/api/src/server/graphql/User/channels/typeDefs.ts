import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const UserChannelConnection = gql`
  type UserChannelConnection {
    pageInfo: PageInfo!
    totalCount: NonNegativeInt!
    edges: [UserChannelEdge]
  }
`;

const UserChannelEdge = gql`
  type UserChannelEdge {
    cursor: Cursor!
    node: Channel!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [
  UserChannelConnection,
  UserChannelEdge,
];

export default typeDefs;
