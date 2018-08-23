/**
 * Configuration module.
 * Here we export environmental variables
 * or throw if they were not set.
 *
 * Intended to be imported at the start of the application.
 */

import { getEnvOrThrow } from './helpers';

const environment = getEnvOrThrow<string>('NODE_ENV', {
  valueType: 'string',
});

const logLevel = getEnvOrThrow<string>('LOG_LEVEL', {
  defaultValue: 'info',
  valueType: 'string',
});

const graphqlServerHost = getEnvOrThrow<string>('GRAPHQL_SERVER_HOST', {
  defaultValue: '0.0.0.0',
  valueType: 'string',
});

const graphqlServerPort = getEnvOrThrow<number>('GRAPHQL_SERVER_PORT', {
  defaultValue: 4000,
  valueType: 'number',
});

const helmReleaseName = getEnvOrThrow<string>('HELM_RELEASE_NAME', {
  defaultValue: '',
  valueType: 'string',
});

const dbHost = getEnvOrThrow<string>('DB_HOST', {
  valueType: 'string',
});

const dbUser = getEnvOrThrow<string>('DB_USER', {
  valueType: 'string',
});

const dbPassword = getEnvOrThrow<string>('DB_PASSWORD', {
  valueType: 'string',
});

const dbName = getEnvOrThrow<string>('DB_NAME', {
  valueType: 'string',
});

const mockSchema = getEnvOrThrow<boolean>('MOCK_SCHEMA', {
  valueType: 'boolean',
  defaultValue: environment === 'development',
});

const googleClientId = getEnvOrThrow<string>('GOOGLE_CLIENT_ID', {
  valueType: 'string',
});

const googleClientSecret = getEnvOrThrow<string>('GOOGLE_CLIENT_SECRET', {
  valueType: 'string',
});

const jwtSecret = getEnvOrThrow<string>('JWT_SECRET', {
  valueType: 'string',
});

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
  jwtSecret,
};
