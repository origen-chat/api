import { gql } from 'apollo-server-express';

const ChannelMessageConnection = gql`
  type ChannelMessageConnection {
    pageInfo: PageInfo!
    totalCount: Int!
    edges: [ChannelMessageEdge]
  }
`;

const ChannelMessageEdge = gql`
  type ChannelMessageEdge {
    cursor: Cursor!
    node: Message!
  }
`;

export default [ChannelMessageConnection, ChannelMessageEdge];
