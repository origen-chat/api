import { gql } from 'apollo-server-express';

const Reaction = gql`
  type Reaction implements Node {
    id: ID!

    content: String!
    author: User!
    reactable: Reactable!
  }
`;

export default [Reaction];
