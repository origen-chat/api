import { db } from './src/core';

db.startDB();

const { knexConfigs } = db;

module.exports = knexConfigs;
