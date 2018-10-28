import http from 'http';

import {
  ApolloServer,
  Config as ApolloServerConfig,
} from 'apollo-server-express';
import cors from 'cors';
import express from 'express';

import { env } from '../config';
import * as core from '../core';
import { passport } from './authentication';
import {
  handleSubscriptionConnect,
  handleSubscriptionDisconnect,
  makeContext,
  mocks,
  resolvers,
  typeDefs,
} from './graphql';
import { router } from './router';

const {
  graphqlServerPort,
  graphqlServerHost,
  mockSchema,
  mockEntireSchema,
} = env;

export async function startServer() {
  const expressApp = express();

  expressApp.use(cors());
  expressApp.use(passport.initialize());
  expressApp.use(router);

  const apolloServerConfig: ApolloServerConfig = {
    typeDefs: typeDefs as any,
    resolvers: resolvers as any,
    mocks: mockSchema ? mocks : false,
    mockEntireSchema: false,
    context: makeContext,
    subscriptions: {
      onConnect: handleSubscriptionConnect,
      onDisconnect: handleSubscriptionDisconnect as any,
    },
  };

  const apolloServer = new ApolloServer(apolloServerConfig);

  apolloServer.applyMiddleware({ app: expressApp });

  const httpServer = http.createServer(expressApp);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(graphqlServerPort, graphqlServerHost as any, () => {
    core.logger.info(
      `🚀 API server ready at http://${graphqlServerHost}:${graphqlServerPort}${
        apolloServer.graphqlPath
      } and ws://${graphqlServerHost}:${graphqlServerPort}${
        apolloServer.subscriptionsPath
      }`,
    );
  });
}
