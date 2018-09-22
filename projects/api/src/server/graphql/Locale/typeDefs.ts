import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const Locale = gql`
  enum Locale {
    EN
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [Locale];

export default typeDefs;
