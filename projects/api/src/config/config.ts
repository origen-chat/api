/**
 * Configuration module.
 * Here we export environmental variables
 * or throw if they were not set.
 *
 * Intended to be imported at the start of the application.
 */

import { getEnvOrThrow } from './helpers';

const environment = getEnvOrThrow('NODE_ENV', {
  valueType: 'string',
}) as string;

const logLevel = getEnvOrThrow('LOG_LEVEL', {
  defaultValue: 'info',
  valueType: 'string',
}) as string;

const graphQLServerPort = getEnvOrThrow('GRAPHQL_SERVER_PORT', {
  defaultValue: 4000,
  valueType: 'number',
}) as number;

const helmReleaseName = getEnvOrThrow('HELM_RELEASE_NAME', {
  defaultValue: '',
  valueType: 'string',
}) as string;

const dbHost = getEnvOrThrow('DB_HOST', {
  valueType: 'string',
}) as string;

const dbUser = getEnvOrThrow('DB_USER', {
  valueType: 'string',
}) as string;

const dbPassword = getEnvOrThrow('DB_PASSWORD', {
  valueType: 'string',
}) as string;

const dbName = getEnvOrThrow('DB_NAME', {
  valueType: 'string',
}) as string;

export const env = {
  environment,
  logLevel,
  graphQLServerPort,
  helmReleaseName,
  dbHost,
  dbUser,
  dbPassword,
  dbName,
};
