import { env } from '../../config';
import * as core from '../../core';

import graphqlServer from './graphqlServer';
import httpServer from './httpServer';

const { serverPort, serverHost } = env;

/**
 * Starts the main server.
 */
export async function startServer(): Promise<void> {
  await startListening();
}

async function startListening(): Promise<void> {
  return new Promise(resolve => {
    httpServer.listen(
      serverPort,
      serverHost,
      (): void => {
        core.logger.info(
          `🚀 server ready at http://${serverHost}:${serverPort}`,
        );

        core.logger.info(
          `🚀 graphql endpoints ready at http://${serverHost}:${serverPort}${
            graphqlServer.graphqlPath
          } and ws://${serverHost}:${serverPort}${
            graphqlServer.subscriptionsPath
          }`,
        );

        resolve();
      },
    );
  });
}

export async function closeServer(): Promise<void> {
  await closeHttpServer();
}

async function closeHttpServer(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    httpServer.close((error: Error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
