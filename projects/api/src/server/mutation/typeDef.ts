import { gql } from 'apollo-server-express';

export const Mutation = gql`
  type Mutation {
    updateViewer(input: UpdateViewerInput): User!
    sendMessage: String!
  }

  input UpdateViewerInput {
    username: String
  }
`;

export default Mutation;
