import db, { maybeAddTransactionToQuery, doInTransaction } from '../db';
import { DBOptions } from '../types';
import { getWorkspaceById } from '../workspaces';

import { isUserWorkspaceMembership } from './predicates';
import { maybeUpdateSubscriptionQuantityInStripe } from './subscriptions';
import { workspaceMembershipsTableName } from './constants';
import { WorkspaceMembership } from './types';

export async function deleteWorkspaceMembership(
  workspaceMembership: WorkspaceMembership,
  options: DBOptions = {},
): Promise<WorkspaceMembership> {
  await doInTransaction(async transaction => {
    const optionsWithTransaction = { ...options, transaction };

    await deleteWorkspaceMembershipFromDB(
      workspaceMembership,
      optionsWithTransaction,
    );

    if (isUserWorkspaceMembership(workspaceMembership)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const workspace = (await getWorkspaceById(
        workspaceMembership.workspaceId,
      ))!;

      await maybeUpdateSubscriptionQuantityInStripe(
        { workspace },
        optionsWithTransaction,
      );
    }
  }, options);

  return workspaceMembership;
}

export async function deleteWorkspaceMembershipFromDB(
  workspaceMembership: WorkspaceMembership,
  options: DBOptions = {},
): Promise<WorkspaceMembership> {
  await doDeleteWorkspaceMembershipFromDB(workspaceMembership, options);

  return workspaceMembership;
}

export async function doDeleteWorkspaceMembershipFromDB(
  workspaceMembership: WorkspaceMembership,
  options: DBOptions = {},
): Promise<void> {
  const query = db
    .delete()
    .from(workspaceMembershipsTableName)
    .where({ id: workspaceMembership.id });

  maybeAddTransactionToQuery(query, options);

  await query;
}
