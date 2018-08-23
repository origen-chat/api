import { gql } from 'apollo-server-express';

const WorkspaceChannelConnection = gql`
  type WorkspaceChannelConnection {
    pageInfo: PageInfo!
    totalCount: NonNegativeInt!
    edges: [WorkspaceChannelEdge]
  }
`;

const WorkspaceChannelEdge = gql`
  type WorkspaceChannelEdge {
    cursor: Cursor!
    node: Channel!
  }
`;

export default [WorkspaceChannelConnection, WorkspaceChannelEdge];
