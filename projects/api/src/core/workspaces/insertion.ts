import { pick } from 'ramda';

import { insertInitialDefaultChannel } from '../channels';
import db, { doInTransaction, maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { addOwnerToWorkspace } from '../workspaceMemberships';
import { workspacesTableName } from './constants';
import { Workspace } from './types';

export type InsertWorkspaceArgs = Pick<Workspace, 'name' | 'displayName'> &
  Partial<Pick<Workspace, 'description'>> &
  Readonly<{ owner: User }>;

/**
 * Inserts a workspace.
 */
export async function insertWorkspace(
  args: InsertWorkspaceArgs,
  options: DBOptions = {},
): Promise<Workspace> {
  const insertedWorkspace = await doInTransaction(
    async transaction => {
      const optionsWithTransaction: DBOptions = { transaction };

      const workspaceOwner = args.owner;
      const doInsertWorkspaceArgs = makeDoInsertWorkspaceArgs(args);

      const workspace = await doInsertWorkspace(
        doInsertWorkspaceArgs,
        optionsWithTransaction,
      );
      await addOwnerToWorkspace(
        workspace,
        workspaceOwner,
        optionsWithTransaction,
      );
      await insertInitialDefaultChannel(
        workspace,
        workspaceOwner,
        optionsWithTransaction,
      );

      return workspace;
    },
    { transactionFromBefore: options.transaction },
  );

  return insertedWorkspace;
}

function makeDoInsertWorkspaceArgs(
  args: InsertWorkspaceArgs,
): DoInsertWorkspaceArgs {
  const doInsertWorkspaceArgs: DoInsertWorkspaceArgs = pick(
    ['name', 'displayName', 'description'],
    args,
  );

  return doInsertWorkspaceArgs;
}

export type DoInsertWorkspaceArgs = Pick<Workspace, 'name' | 'displayName'> &
  Partial<Pick<Workspace, 'description'>>;

export async function doInsertWorkspace(
  args: DoInsertWorkspaceArgs,
  options: DBOptions = {},
): Promise<Workspace> {
  const query = db
    .insert(args)
    .into(workspacesTableName)
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [workspace] = await query;

  return workspace;
}
