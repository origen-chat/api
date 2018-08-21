import { gql } from 'apollo-server-express';

export const AddStarInput = gql`
  input AddStarInput {
    starrableId: ID!
  }
`;

export const AddStarPayload = gql`
  type AddStarPayload {
    star: Star!
  }
`;

export default [AddStarInput, AddStarPayload];
