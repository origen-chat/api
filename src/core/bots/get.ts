import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { getCachedBot, maybeCacheBot } from './cache';
import { botsTableName } from './constants';
import { Bot } from './types';

export async function getBotById(
  id: Bot['id'],
  options: DBOptions = {},
): Promise<Bot | null> {
  const cachedBot = await getCachedBot(id);

  if (cachedBot) {
    return cachedBot;
  }

  const bot = await getBotByFromDB({ id }, options);

  await maybeCacheBot(bot);

  return bot;
}

export type GetBotByArgs = Pick<Bot, 'id'>;

async function getBotByFromDB(
  args: GetBotByArgs,
  options: DBOptions = {},
): Promise<Bot | null> {
  const query = db
    .select('*')
    .from(botsTableName)
    .where(args)
    .first();

  maybeAddTransactionToQuery(query, options);

  const bot: Bot | null = await query;

  return bot;
}

export async function getBotsByIds(
  ids: ReadonlyArray<Bot['id']>,
  options: DBOptions = {},
): Promise<ReadonlyArray<Bot>> {
  const bots = await getBotsBy({ ids }, options);

  return bots;
}

export type GetBotsByArgs = Readonly<{ ids: ReadonlyArray<Bot['id']> }>;

async function getBotsBy(
  args: GetBotsByArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<Bot>> {
  const query = db.select('*').from(botsTableName);

  if (args.ids) {
    query.whereIn('id', args.ids as any);
  }

  maybeAddTransactionToQuery(query, options);

  const bots: ReadonlyArray<Bot> = await query;

  return bots;
}
