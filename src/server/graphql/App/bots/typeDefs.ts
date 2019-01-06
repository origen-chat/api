import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const AppBotConnection = gql`
  type AppBotConnection {
    pageInfo: PageInfo!
    totalCount: NonNegativeInt!
    edges: [UserWorkspaceEdge]
  }
`;

const AppBotEdge = gql`
  type AppBotEdge {
    cursor: Cursor!
    node: Bot!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [AppBotConnection, AppBotEdge];

export default typeDefs;
