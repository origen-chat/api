import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';

import { appsTableName } from './constants';
import { App } from './types';

export async function getAppById(
  id: App['id'],
  options: DBOptions = {},
): Promise<App | null> {
  const app = await getAppByFromDB({ id }, options);

  return app;
}

export type GetAppByFromDBArgs = Pick<App, 'id'>;

async function getAppByFromDB(
  args: GetAppByFromDBArgs,
  options: DBOptions = {},
): Promise<App | null> {
  const query = db
    .select('*')
    .from(appsTableName)
    .where(args)
    .first();

  maybeAddTransactionToQuery(query, options);

  const app: App | null = await query;

  return app;
}

export async function getAppsByIds(
  ids: ReadonlyArray<App['id']>,
  options: DBOptions = {},
): Promise<ReadonlyArray<App>> {
  const apps = await getAppsByFromDB({ ids }, options);

  return apps;
}

export type GetAppsByFromDBArgs = Readonly<{ ids: ReadonlyArray<App['id']> }>;

async function getAppsByFromDB(
  args: GetAppsByFromDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<App>> {
  const query = db.select('*').from(appsTableName);

  if (args.ids) {
    query.whereIn('id', args.ids as any);
  }

  maybeAddTransactionToQuery(query, options);

  const apps: ReadonlyArray<App> = await query;

  return apps;
}
