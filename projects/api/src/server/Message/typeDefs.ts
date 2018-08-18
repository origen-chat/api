import { gql } from 'apollo-server-express';

const Message = gql`
  type Message implements Node {
    id: ID!

    sender: User!

    channel: Channel
    recipient: User

    reactions: [Reaction]!
  }
`;

export default [Message];
