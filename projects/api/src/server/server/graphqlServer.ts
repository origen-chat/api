import {
  ApolloServer,
  Config as ApolloServerConfig,
} from 'apollo-server-express';

import { env } from '../../config';
import {
  handleSubscriptionConnect,
  handleSubscriptionDisconnect,
  makeContext,
  mocks,
  resolvers,
  typeDefs,
} from '../graphql';

const { mockSchema, mockEntireSchema } = env;

const apolloServerConfig: ApolloServerConfig = {
  typeDefs: typeDefs as any,
  resolvers: resolvers as any,
  mocks: false,
  // mocks: mockSchema ? mocks : false,
  mockEntireSchema,
  context: makeContext,
  subscriptions: {
    onConnect: handleSubscriptionConnect,
    onDisconnect: handleSubscriptionDisconnect as any,
  },
};

export const graphqlServer = new ApolloServer(apolloServerConfig);

export default graphqlServer;
