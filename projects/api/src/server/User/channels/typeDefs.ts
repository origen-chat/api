import { gql } from 'apollo-server-express';

const UserChannelConnection = gql`
  type UserChannelConnection {
    pageInfo: PageInfo!
    totalCount: Int!
    edges: [UserChannelEdge]
  }
`;

const UserChannelEdge = gql`
  type UserChannelEdge {
    cursor: String!
    node: Channel!
  }
`;

export default [UserChannelConnection, UserChannelEdge];
