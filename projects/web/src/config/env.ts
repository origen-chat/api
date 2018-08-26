const environment = process.env.NODE_ENV!;
const apiEndpoint = process.env.API_ENDPOINT!;
const graphqlWSEndpoint = process.env.GRAPHQL_WS_ENDPOINT!;
const googleClientId = process.env.GOOGLE_CLIENT_ID!;

const env = {
  environment,
  apiEndpoint,
  graphqlWSEndpoint,
  googleClientId,
};

export default env;
