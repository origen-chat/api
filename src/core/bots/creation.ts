import { insertIntoDB } from '../db';
import { DBOptions } from '../types';
import { botsTableName } from './constants';
import { Bot } from './types';

export type CreateBotArgs = InsertBotIntoDBArgs;

export async function createBot(
  args: CreateBotArgs,
  options: DBOptions = {},
): Promise<Bot> {
  const bot = await insertBotIntoDB(args, options);

  return bot;
}

type InsertBotIntoDBArgs = Pick<Bot, 'name'>;

async function insertBotIntoDB(
  args: InsertBotIntoDBArgs,
  options: DBOptions = {},
): Promise<Bot> {
  const doInsertBotIntoDBArgs = makeDoInsertBotIntoDBArgs(args);

  const bot = await doInsertBotIntoDB(doInsertBotIntoDBArgs, options);

  return bot;
}

function makeDoInsertBotIntoDBArgs(
  args: InsertBotIntoDBArgs,
): DoInsertBotIntoDBArgs {
  const doInsertBotArgs: DoInsertBotIntoDBArgs = {
    name: args.name,
  };

  return doInsertBotArgs;
}

type DoInsertBotIntoDBArgs = Pick<Bot, 'name'>;

async function doInsertBotIntoDB(
  args: DoInsertBotIntoDBArgs,
  options: DBOptions = {},
): Promise<Bot> {
  const bot = await insertIntoDB(
    {
      data: args,
      tableName: botsTableName,
    },
    options,
  );

  return bot;
}
