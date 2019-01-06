import * as core from './src/core';

core.db.startDB();

const { knexConfigs } = core.db;

module.exports = knexConfigs;
