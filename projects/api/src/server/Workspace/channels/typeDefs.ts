import { gql } from 'apollo-server-express';

const WorkspaceChannelConnection = gql`
  type WorkspaceChannelConnection {
    pageInfo: PageInfo!
    totalCount: Int!
    edges: [WorkspaceChannelEdge]
  }
`;

const WorkspaceChannelEdge = gql`
  type WorkspaceChannelEdge {
    cursor: String!
    node: Channel!
  }
`;

export default [WorkspaceChannelConnection, WorkspaceChannelEdge];
