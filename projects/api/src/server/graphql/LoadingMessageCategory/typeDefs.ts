import { gql } from 'apollo-server-express';

const LoadingMessageCategory = gql`
  enum LoadingMessageCategory {
    MOTIVATIONAL
    PRO_TIP
  }
`;

export default [LoadingMessageCategory];
