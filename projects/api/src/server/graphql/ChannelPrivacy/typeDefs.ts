import { gql } from 'apollo-server-express';

const ChannelPrivacy = gql`
  enum ChannelPrivacy {
    PUBLIC
    PRIVATE
  }
`;

export default [ChannelPrivacy];
