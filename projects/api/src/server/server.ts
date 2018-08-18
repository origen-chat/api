import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { env } from '../config';
import logger from '../core/logger';
import { makeContext } from './context';
import { resolvers, typeDefs } from './schema';

const { graphQLServerPort } = env;

export async function startGraphQLServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers as any,
    mocks: true,
    mockEntireSchema: false,
    context: makeContext,
  });

  server.applyMiddleware({ app });

  app.listen({ port: graphQLServerPort }, () => {
    logger.info(`Server ready at ${server.graphqlPath}`);
  });
}
