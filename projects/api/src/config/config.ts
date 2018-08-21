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

const graphqlServerHost = getEnvOrThrow('GRAPHQL_SERVER_HOST', {
  defaultValue: '0.0.0.0',
  valueType: 'string',
}) as string;

const graphqlServerPort = getEnvOrThrow('GRAPHQL_SERVER_PORT', {
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

const mockSchema = getEnvOrThrow('MOCK_SCHEMA', {
  valueType: 'boolean',
  defaultValue: environment === 'development',
}) as boolean;

const googleClientId = getEnvOrThrow('GOOGLE_CLIENT_ID', {
  valueType: 'string',
}) as string;

const googleClientSecret = getEnvOrThrow('GOOGLE_CLIENT_SECRET', {
  valueType: 'string',
}) as string;

export const env = {
  environment,
  logLevel,
  graphqlServerHost,
  graphqlServerPort,
  helmReleaseName,
  dbHost,
  dbUser,
  dbPassword,
  dbName,
  mockSchema,
  googleClientId,
  googleClientSecret,
};
