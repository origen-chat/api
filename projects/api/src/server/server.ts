import {
  ApolloServer,
  Config as ApolloServerConfig,
} from 'apollo-server-express';
import express from 'express';

import { env } from '../config';
import { logger } from '../core';
import { passport } from './authentication';
import { makeContext, resolvers, typeDefs } from './graphql';
import { router } from './router';

const { graphqlServerPort, graphqlServerHost, mockSchema } = env;

export async function startServer() {
  const app = express();

  app.use(passport.initialize());
  app.use(router);

  const apolloServerConfig: ApolloServerConfig = {
    typeDefs: typeDefs as any,
    resolvers: resolvers as any,
    mocks: mockSchema,
    mockEntireSchema: false,
    context: makeContext,
  };

  const server = new ApolloServer(apolloServerConfig);

  server.applyMiddleware({ app });

  app.listen(graphqlServerPort, graphqlServerHost, () => {
    logger.info(
      `Server ready at http://${graphqlServerHost}:${graphqlServerPort}${
        server.graphqlPath
      }`,
    );
  });
}
