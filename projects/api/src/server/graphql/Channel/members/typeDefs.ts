import { gql } from 'apollo-server-express';

const ChannelMemberConnection = gql`
  type ChannelMemberConnection {
    pageInfo: PageInfo!
    totalCount: NonNegativeInt!
    edges: [ChannelMemberEdge]
  }
`;

const ChannelMemberEdge = gql`
  type ChannelMemberEdge {
    cursor: Cursor!
    node: User!
  }
`;

export default [ChannelMemberConnection, ChannelMemberEdge];
