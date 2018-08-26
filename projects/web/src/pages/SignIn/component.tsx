import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';

const query = gql`
  query {
    viewer {
      id
    }
  }
`;

export const SignIn: React.SFC = () => (
  <Query query={query}>{result => <>{JSON.stringify(result.data)}</>}</Query>
);

export default SignIn;
