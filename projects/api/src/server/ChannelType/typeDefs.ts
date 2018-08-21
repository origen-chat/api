import { gql } from 'apollo-server-express';

const ChannelType = gql`
  enum ChannelType {
    NAMED
    DIRECT_MESSAGES
  }
`;

export default [ChannelType];
