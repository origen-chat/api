const core = require('./src/core');

module.exports = {
  ...core.db.connectionOptions,
};
