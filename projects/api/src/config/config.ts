/**
 * Configuration module.
 * Here we export environmental variables
 * or throw if they were not set.
 *
 * Intended to be imported at the start of the application.
 */

import { getEnvOrThrow } from './helpers';

const logLevel = getEnvOrThrow('LOG_LEVEL', {
  defaultValue: 'info',
}) as string;

const graphQLServerPort = getEnvOrThrow('GRAPHQL_SERVER_PORT', {
  defaultValue: 4000,
  valueType: 'number',
}) as number;

export const env = {
  logLevel,
  graphQLServerPort,
};
