import { gql } from 'apollo-server-express';

const Query = gql`
  type Query {
    node(id: ID!): Node

    user(
      id: ID
      username: String
      usernameIdentifier: String
      email: Email
    ): User!

    workspace(id: ID, name: String): Workspace!

    channel(id: ID!): Channel!

    app(id: ID!): App!

    bot(id: ID!): Bot!

    viewer: Actor!
  }
`;

export default [Query];
