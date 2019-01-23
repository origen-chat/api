import { insertIntoDB } from '../db';
import { DBOptions } from '../types';

import { appsTableName } from './constants';
import { App } from './types';

export type CreateAppArgs = InsertAppIntoDBArgs;

export async function createApp(
  args: CreateAppArgs,
  options: DBOptions = {},
): Promise<App> {
  const app = await insertAppIntoDB(args, options);

  return app;
}

type InsertAppIntoDBArgs = Pick<App, 'name'>;

async function insertAppIntoDB(
  args: InsertAppIntoDBArgs,
  options: DBOptions = {},
): Promise<App> {
  const doInsertAppIntoDBArgs = makeDoInsertAppIntoDBArgs(args);

  const app = await doInsertAppIntoDB(doInsertAppIntoDBArgs, options);

  return app;
}

function makeDoInsertAppIntoDBArgs(
  args: InsertAppIntoDBArgs,
): DoInsertAppIntoDBArgs {
  const doInsertAppArgs: DoInsertAppIntoDBArgs = {
    name: args.name,
  };

  return doInsertAppArgs;
}

export type DoInsertAppIntoDBArgs = Pick<App, 'name'>;

export async function doInsertAppIntoDB(
  args: DoInsertAppIntoDBArgs,
  options: DBOptions = {},
): Promise<App> {
  const app = await insertIntoDB(
    {
      data: args,
      tableName: appsTableName,
    },
    options,
  );

  return app;
}
