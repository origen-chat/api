import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const LoadingMessage = gql`
  type LoadingMessage implements Node {
    id: ID!

    message: String!
    category: LoadingMessageCategory

    isCustom: Boolean!

    author: User
    workspace: Workspace
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [LoadingMessage];

export default typeDefs;
