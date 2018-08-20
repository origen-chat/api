import ApolloClient from 'apollo-boost';

const apolloClient = new ApolloClient({
  uri: 'http://api.dev.loop.com/graphql',
});

export default apolloClient;
