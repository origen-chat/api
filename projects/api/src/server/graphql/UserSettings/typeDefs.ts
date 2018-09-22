import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const UserSettings = gql`
  type UserSettings {
    locale: Locale!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [UserSettings];

export default typeDefs;
