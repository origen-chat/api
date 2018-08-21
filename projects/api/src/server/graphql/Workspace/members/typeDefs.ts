import { gql } from 'apollo-server-express';

const WorkspaceMemberConnection = gql`
  type WorkspaceMemberConnection {
    pageInfo: PageInfo!
    totalCount: Int!
    edges: [WorkspaceMemberEdge]
  }
`;

const WorkspaceMemberEdge = gql`
  type WorkspaceMemberEdge {
    cursor: String!
    node: User!
  }
`;

export default [WorkspaceMemberConnection, WorkspaceMemberEdge];
