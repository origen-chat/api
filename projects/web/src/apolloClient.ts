import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';

import { getToken } from './auth';
import { env } from './config';

export type Cache = Readonly<{}>;

/* eslint-disable no-console */
/* tslint:disable no-console */

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const wsLink = new WebSocketLink({
  uri: env.graphqlWSEndpoint,
  options: {
    reconnect: true,
    async connectionParams() {
      const authToken = await getToken();
      const params = { authToken };

      return params;
    },
  },
});

const link = ApolloLink.from([errorLink, wsLink]);

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link,
  cache,
});

export default apolloClient;
