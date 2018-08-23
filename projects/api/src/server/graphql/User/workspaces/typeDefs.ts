import { gql } from 'apollo-server-express';

const UserWorkspaceConnection = gql`
  type UserWorkspaceConnection {
    pageInfo: PageInfo!
    totalCount: NonNegativeInt!
    edges: [UserWorkspaceEdge]
  }
`;

const UserWorkspaceEdge = gql`
  type UserWorkspaceEdge {
    cursor: Cursor!
    node: Workspace!
  }
`;

export default [UserWorkspaceConnection, UserWorkspaceEdge];
