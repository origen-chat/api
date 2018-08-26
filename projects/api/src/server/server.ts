import { createServer } from 'http';

import {
  ApolloServer,
  Config as ApolloServerConfig,
} from 'apollo-server-express';
import cors from 'cors';
import express from 'express';

import { env } from '../config';
import { logger } from '../core';
import { passport } from './authentication';
import {
  handleSubscriptionConnect,
  makeContext,
  resolvers,
  typeDefs,
} from './graphql';
import { router } from './router';

const { graphqlServerPort, graphqlServerHost, mockSchema } = env;

export async function startServer() {
  const expressApp = express();

  expressApp.use(cors());
  expressApp.use(passport.initialize());
  expressApp.use(router);

  const apolloServerConfig: ApolloServerConfig = {
    typeDefs: typeDefs as any,
    resolvers: resolvers as any,
    mocks: mockSchema,
    mockEntireSchema: false,
    context: makeContext,
    subscriptions: {
      onConnect: handleSubscriptionConnect,
    },
  };

  const apolloServer = new ApolloServer(apolloServerConfig);

  apolloServer.applyMiddleware({ app: expressApp });

  const httpServer = createServer(expressApp);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(graphqlServerPort, graphqlServerHost, () => {
    logger.info(
      `Server ready at http://${graphqlServerHost}:${graphqlServerPort}${
        apolloServer.graphqlPath
      } and at ws://${graphqlServerHost}:${graphqlServerPort}${
        apolloServer.subscriptionsPath
      }`,
    );
  });
}
