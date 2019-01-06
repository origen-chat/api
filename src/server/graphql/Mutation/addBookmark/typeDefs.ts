import { gql } from 'apollo-server-express';

export const AddBookmarkInput = gql`
  input AddBookmarkInput {
    starrableId: ID!
  }
`;

export const AddBookmarkPayload = gql`
  type AddBookmarkPayload {
    star: Bookmark!
  }
`;

export default [AddBookmarkInput, AddBookmarkPayload];
