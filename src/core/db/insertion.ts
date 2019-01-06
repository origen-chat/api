import { DBOptions } from '../types';
import { db } from './db';
import { maybeAddTransactionToQuery } from './transactions';

export type InsertIntoDBArgs<TData> = Readonly<{
  tableName: string;
  data: TData;
}>;

export async function insertIntoDB<TData extends any | ReadonlyArray<any>>(
  args: InsertIntoDBArgs<TData>,
  options: DBOptions = {},
): Promise<TData extends ReadonlyArray<any> ? ReadonlyArray<any> : any> {
  const query = db
    .insert(args.data)
    .into(args.tableName)
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const rows = await query;

  if (Array.isArray(args.data)) {
    return rows;
  }

  const [firstRow] = rows;

  return firstRow;
}
