import { gql } from 'apollo-server-express';

import { typeDefs as updateViewerTypeDefs } from './updateViewer';

export const Mutation = gql`
  type Mutation {
    updateViewer(input: UpdateViewerInput): UpdateViewerPayload!
  }
`;

export default [Mutation, ...updateViewerTypeDefs];
