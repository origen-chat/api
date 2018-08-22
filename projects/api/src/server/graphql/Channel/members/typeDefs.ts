import { gql } from 'apollo-server-express';

const ChannelMemberConnection = gql`
  type ChannelMemberConnection {
    pageInfo: PageInfo!
    totalCount: Int!
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
