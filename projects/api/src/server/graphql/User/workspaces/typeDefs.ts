import { gql } from 'apollo-server-express';

const UserWorkspaceConnection = gql`
  type UserWorkspaceConnection {
    pageInfo: PageInfo!
    totalCount: Int!
    edges: [UserWorkspaceEdge]
  }
`;

const UserWorkspaceEdge = gql`
  type UserWorkspaceEdge {
    cursor: String!
    node: Workspace!
  }
`;

export default [UserWorkspaceConnection, UserWorkspaceEdge];
