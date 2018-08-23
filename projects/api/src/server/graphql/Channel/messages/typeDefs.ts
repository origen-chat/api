import { gql } from 'apollo-server-express';

const ChannelMessageConnection = gql`
  type ChannelMessageConnection {
    pageInfo: PageInfo!
    totalCount: NonNegativeInt!
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
