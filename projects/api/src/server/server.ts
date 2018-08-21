import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { env } from '../config';
import logger from '../core/logger';
import { makeContext } from './context';
import { resolvers, typeDefs } from './schema';

const { graphqlServerPort, graphqlServerHost, mockSchema } = env;

export async function startGraphQLServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs: typeDefs as any,
    resolvers: resolvers as any,
    mocks: mockSchema,
    mockEntireSchema: false,
    context: makeContext,
  });

  server.applyMiddleware({ app });

  app.listen(graphqlServerPort, graphqlServerHost, () => {
    logger.info(
      `Server ready at ${graphqlServerHost}:${graphqlServerPort}${
        server.graphqlPath
      }`,
    );
  });
}
