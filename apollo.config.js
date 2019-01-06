const graphqlEndpoint = 'http://localhost:4000/graphql';

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
