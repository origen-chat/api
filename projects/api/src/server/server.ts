import {
  ApolloServer,
  Config as ApolloServerConfig,
} from 'apollo-server-express';
import express from 'express';

import { env } from '../config';
import { logger } from '../core';
import { makeContext, resolvers, typeDefs } from './graphql';

const { graphqlServerPort, graphqlServerHost, mockSchema } = env;

export async function startGraphQLServer() {
  const app = express();

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
      `Server ready at ${graphqlServerHost}:${graphqlServerPort}${
        server.graphqlPath
      }`,
    );
  });
}
