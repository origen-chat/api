import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { bookmarksTableName } from './constants';
import { Bookmark } from './types';

export async function getBookmarkById(
  id: Bookmark['id'],
  options: DBOptions = {},
): Promise<Bookmark | null> {
  const bookmark = await getBookmarkBy({ id }, options);

  return bookmark;
}

export type GetBookmarkByArgs = Pick<Bookmark, 'id'>;

async function getBookmarkBy(
  args: GetBookmarkByArgs,
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
  const bookmarks = await getBookmarksBy({ ids }, options);

  return bookmarks;
}

export type GetBookmarksByArgs = Readonly<{
  ids: ReadonlyArray<Bookmark['id']>;
}>;

async function getBookmarksBy(
  args: GetBookmarksByArgs,
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
