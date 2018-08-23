import { gql } from 'apollo-server-express';

const WorkspaceMemberConnection = gql`
  type WorkspaceMemberConnection {
    pageInfo: PageInfo!
    totalCount: NonNegativeInt!
    edges: [WorkspaceMemberEdge]
  }
`;

const WorkspaceMemberEdge = gql`
  type WorkspaceMemberEdge {
    cursor: Cursor!
    node: User!
  }
`;

export default [WorkspaceMemberConnection, WorkspaceMemberEdge];
