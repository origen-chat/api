import db, { maybeAddTransactionToQuery } from '../db';
import { ID, DBOptions } from '../types';

import { userGroupsTableName } from './constants';
import { UserGroup } from './types';

export async function getUserGroupById(
  id: ID,
  options: DBOptions = {},
): Promise<UserGroup | null> {
  const [userGroup] = await getUserGroupsByFromDB({ ids: [id] }, options);

  if (!userGroup) {
    return null;
  }

  return userGroup;
}

export async function getUserGroupsByIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserGroup>> {
  const userGroups = await getUserGroupsByFromDB({ ids }, options);

  return userGroups;
}

type GetUserGroupsByFromDBArgs = Readonly<{ ids: ReadonlyArray<ID> }>;

async function getUserGroupsByFromDB(
  args: GetUserGroupsByFromDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserGroup>> {
  const query = db.select(`${userGroupsTableName}.*`).from(userGroupsTableName);

  query.whereIn('id', args.ids as any);

  maybeAddTransactionToQuery(query, options);

  const userGroups: ReadonlyArray<UserGroup> = await query;

  return userGroups;
}
