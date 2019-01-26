import { makeEnv, parsers } from '@strattadb/environment';

const env = makeEnv({
  environment: {
    parser: parsers.whitelist(['production', 'development', 'test']),
    required: true,
    envVarName: 'NODE_ENV',
  },
  debug: {
    parser: parsers.boolean,
    required: false,
    defaultValue: false,
    envVarName: 'DEBUG',
  },
  logLevel: {
    parser: parsers.string,
    required: false,
    defaultValue: 'info',
    envVarName: 'LOG_LEVEL',
  },
  serverHost: {
    parser: parsers.string,
    required: false,
    defaultValue: '0.0.0.0',
    envVarName: 'SERVER_HOST',
  },
  serverPort: {
    parser: parsers.port,
    required: false,
    defaultValue: 4000,
    envVarName: 'SERVER_PORT',
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
    parser: parsers.port,
    required: true,
    envVarName: 'REDIS_PORT',
  },
  redisDB: {
    parser: parsers.nonNegativeInteger,
    required: true,
    envVarName: 'REDIS_DB',
  },
  mockSchema: {
    parser: parsers.boolean,
    required: false,
    defaultValue: false,
    envVarName: 'MOCK_SCHEMA',
  },
  mockEntireSchema: {
    parser: parsers.boolean,
    required: false,
    defaultValue: false,
    envVarName: 'MOCK_ENTIRE_SCHEMA',
  },
  stripePublishableKey: {
    parser: parsers.string,
    required: true,
    envVarName: 'STRIPE_PUBLISHABLE_KEY',
  },
  stripeSecretKey: {
    parser: parsers.string,
    required: true,
    envVarName: 'STRIPE_SECRET_KEY',
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
    description: 'Root URL for the web app',
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
  mailgunApiKey: {
    parser: parsers.string,
    required: false,
    defaultValue: '',
    envVarName: 'MAILGUN_API_KEY',
  },
  mailgunDomain: {
    parser: parsers.string,
    required: false,
    defaultValue: '',
    envVarName: 'MAILGUN_DOMAIN',
  },
  enableEmail: {
    parser: parsers.boolean,
    required: false,
    defaultValue: false,
    description: 'Enable sending emails',
    envVarName: 'ENABLE_EMAIL',
  },
  gcpProjectId: {
    parser: parsers.string,
    required: true,
    envVarName: 'GCP_PROJECT_ID',
  },
  gcpPrivateKeyPath: {
    parser: parsers.string,
    required: true,
    description: 'Absolute path to the GCP private key file',
    envVarName: 'GCP_PRIVATE_KEY_PATH',
  },
  gcpStorageBucketName: {
    parser: parsers.string,
    required: true,
    envVarName: 'GCP_STORAGE_BUCKET_NAME',
  },
  enableAPI: {
    parser: parsers.boolean,
    required: true,
    description: 'If enabled, this server will handle the API',
    envVarName: 'ENABLE_BACKGROUND_WORKERS',
  },
  enableBackgroundWorkers: {
    parser: parsers.boolean,
    required: true,
    description:
      'If enabled, background workers will process jobs in this server',
    envVarName: 'ENABLE_BACKGROUND_WORKERS',
  },
});

export default env;
