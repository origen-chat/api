import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';

import { bookmarksTableName } from './constants';
import { Bookmark } from './types';

export async function getBookmarkById(
  id: Bookmark['id'],
  options: DBOptions = {},
): Promise<Bookmark | null> {
  const bookmark = await getBookmarkByFromDB({ id }, options);

  return bookmark;
}

export type GetBookmarkByFromDBArgs = Pick<Bookmark, 'id'>;

async function getBookmarkByFromDB(
  args: GetBookmarkByFromDBArgs,
  options: DBOptions = {},
): Promise<Bookmark | null> {
  const query = db
    .select('*')
    .from(bookmarksTableName)
    .where(args)
    .first();

  maybeAddTransactionToQuery(query, options);

  const bookmark: Bookmark | null = await query;

  return bookmark;
}

export async function getBookmarksByIds(
  ids: ReadonlyArray<Bookmark['id']>,
  options: DBOptions = {},
): Promise<ReadonlyArray<Bookmark>> {
  const bookmarks = await getBookmarksByFromDB({ ids }, options);

  return bookmarks;
}

export type GetBookmarksByFromDBArgs = Readonly<{
  ids: ReadonlyArray<Bookmark['id']>;
}>;

async function getBookmarksByFromDB(
  args: GetBookmarksByFromDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<Bookmark>> {
  const query = db.select('*').from(bookmarksTableName);

  if (args.ids) {
    query.whereIn('id', args.ids as any);
  }

  maybeAddTransactionToQuery(query, options);

  const bookmark: ReadonlyArray<Bookmark> = await query;

  return bookmark;
}
