import { gql } from 'apollo-server-express';

const Reaction = gql`
  type Reaction implements Node {
    id: ID!

    type: String!
    author: User!
    message: Message!
  }
`;

export default [Reaction];
