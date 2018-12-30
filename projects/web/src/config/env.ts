const nodeEnvironment = process.env.NODE_ENV!;

const apiEndpoint = process.env.API_ENDPOINT!;
const graphqlWSEndpoint = process.env.GRAPHQL_WS_ENDPOINT!;

const googleClientId = process.env.GOOGLE_CLIENT_ID!;

const sentryDsn = process.env.SENTRY_DSN!;

const enableErrorTracking = process.env.ENABLE_ERROR_TRACKING! === 'true';

const env = {
  nodeEnvironment,
  apiEndpoint,
  graphqlWSEndpoint,
  googleClientId,
  enableErrorTracking,
  sentryDsn,
};

export default env;
