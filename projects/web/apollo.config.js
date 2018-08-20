const { API_URL: graphqlEndpoint } = process.env;

module.exports = {
  schemas: {
    default: {
      schema: 'schema.json',
      endpoint: {
        url: graphqlEndpoint,
      },
    },
  },
};
