import { gql } from 'apollo-server-express';

export const RemoveStarInput = gql`
  input RemoveStarInput {
    id: ID!
  }
`;

export const RemoveStarPayload = gql`
  type RemoveStarPayload {
    star: Star!
  }
`;

export default [RemoveStarInput, RemoveStarPayload];
