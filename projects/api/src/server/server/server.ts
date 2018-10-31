import { env } from '../../config';
import * as core from '../../core';
import graphqlServer from './graphqlServer';
import httpServer from './httpServer';

const { serverPort, serverHost } = env;

/**
 * Starts the main server.
 */
export async function startServer() {
  startListening();
}

function startListening() {
  httpServer.listen(
    serverPort,
    serverHost,
    (): void => {
      core.logger.info(`🚀 server ready at http://${serverHost}:${serverPort}`);

      core.logger.info(
        `🚀 graphql endpoints ready at http://${serverHost}:${serverPort}${
          graphqlServer.graphqlPath
        } and ws://${serverHost}:${serverPort}${
          graphqlServer.subscriptionsPath
        }`,
      );
    },
  );
}
