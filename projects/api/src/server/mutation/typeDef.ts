import { gql } from 'apollo-server-express';

export const Mutation = gql`
  type Mutation {
    sendMessage: String!
  }
`;

export default Mutation;
