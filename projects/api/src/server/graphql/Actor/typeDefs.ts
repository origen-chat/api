import { gql } from 'apollo-server-express';

const Actor = gql`
  interface Actor {
    id: ID!
  }
`;

export default [Actor];
