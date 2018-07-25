import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';

import { env } from '../config';
import logger from '../core/logger';
// import { resolvers, typeDefs } from './schema';

const { graphQLServerPort } = env;

export async function startGraphQLServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: gql`
      type Query {
        peer: Int
      }
    `,
    resolvers: {},
  });

  server.applyMiddleware({ app });

  app.listen({ port: graphQLServerPort }, () => {
    logger.info(`bottlecap node ready at ${server.graphqlPath}`);
  });
}
