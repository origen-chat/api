import { gql } from 'apollo-server-express';

export const RemoveBookmarkInput = gql`
  input RemoveBookmarkInput {
    id: ID!
  }
`;

export const RemoveBookmarkPayload = gql`
  type RemoveBookmarkPayload {
    star: Bookmark!
  }
`;

export default [RemoveBookmarkInput, RemoveBookmarkPayload];
