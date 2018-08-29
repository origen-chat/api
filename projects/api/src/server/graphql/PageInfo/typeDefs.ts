import { gql } from 'apollo-server-express';

const PageInfo = gql`
  type PageInfo {
    startCursor: String
    endCursor: String

    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }
`;

export default [PageInfo];
