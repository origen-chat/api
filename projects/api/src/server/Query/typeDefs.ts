import { gql } from 'apollo-server-express';

const Query = gql`
  type Query {
    node(id: ID!): Node

    user(username: String!, usernameIdentifier: String!): User!

    workspace(id: ID!): Workspace!

    channel(id: ID!): Channel!

    viewer: User!
  }
`;

export default [Query];
