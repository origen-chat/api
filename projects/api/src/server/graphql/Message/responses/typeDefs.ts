import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const MessageResponseConnection = gql`
  type MessageResponseConnection {
    pageInfo: PageInfo!
    totalCount: Int!
    edges: [MessageResponseEdge]
  }
`;

const MessageResponseEdge = gql`
  type MessageResponseEdge {
    cursor: Cursor!
    node: Message!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [
  MessageResponseConnection,
  MessageResponseEdge,
];

export default typeDefs;
