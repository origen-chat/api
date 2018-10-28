import { makeEnv, parsers } from '@strattadb/environment';

const env = makeEnv({
  environment: {
    parser: parsers.whitelist(['production', 'development', 'test']),
    required: true,
    envVarName: 'NODE_ENV',
  },
  logLevel: {
    parser: parsers.string,
    required: false,
    defaultValue: 'info',
    envVarName: 'LOG_LEVEL',
  },
  graphqlServerHost: {
    parser: parsers.string,
    required: false,
    defaultValue: '0.0.0.0',
    envVarName: 'GRAPHQL_SERVER_HOST',
  },
  graphqlServerPort: {
    parser: parsers.port,
    required: false,
    defaultValue: '4000',
    envVarName: 'GRAPHQL_SERVER_PORT',
  },
  helmReleaseName: {
    parser: parsers.string,
    required: false,
    defaultValue: '',
    envVarName: 'HELM_RELEASE_NAME',
  },
  dbHost: {
    parser: parsers.string,
    required: true,
    envVarName: 'DB_HOST',
  },
  dbUser: {
    parser: parsers.string,
    required: true,
    envVarName: 'DB_USER',
  },
  dbPassword: {
    parser: parsers.string,
    required: true,
    envVarName: 'DB_PASSWORD',
  },
  dbName: {
    parser: parsers.string,
    required: true,
    envVarName: 'DB_NAME',
  },
  redisHost: {
    parser: parsers.string,
    required: true,
    envVarName: 'REDIS_HOST',
  },
  redisPort: {
    parser: parsers.nonNegativeInteger,
    required: true,
    envVarName: 'REDIS_PORT',
  },
  mockSchema: {
    parser: parsers.boolean,
    required: false,
    defaultValue: process.env.NODE_ENV === 'development',
    envVarName: 'MOCK_SCHEMA',
  },
  mockEntireSchema: {
    parser: parsers.boolean,
    required: false,
    defaultValue: process.env.NODE_ENV === 'development',
    envVarName: 'MOCK_ENTIRE_SCHEMA',
  },
  googleClientId: {
    parser: parsers.string,
    required: true,
    envVarName: 'GOOGLE_CLIENT_ID',
  },
  googleClientSecret: {
    parser: parsers.string,
    required: true,
    envVarName: 'GOOGLE_CLIENT_SECRET',
  },
  jwtSecret: {
    parser: parsers.string,
    required: true,
    envVarName: 'JWT_SECRET',
  },
  webRootUrl: {
    parser: parsers.string,
    required: true,
    envVarName: 'WEB_ROOT_URL',
  },
  enableErrorTracking: {
    parser: parsers.boolean,
    required: false,
    defaultValue: false,
    envVarName: 'ENABLE_ERROR_TRACKING',
  },
  sentryDsn: {
    parser: parsers.string,
    required: false,
    defaultValue: '',
    envVarName: 'SENTRY_DSN',
  },
});

export default env;
