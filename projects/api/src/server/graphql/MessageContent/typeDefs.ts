import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const MessageContent = gql`
  type MessageContent {
    imageUrls: [String]!
    richText: JSON!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [MessageContent];

export default typeDefs;
