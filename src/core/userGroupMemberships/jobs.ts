import { jobQueues } from '../jobQueues';
import { UserGroup } from '../userGroups';
import { ID } from '../types';

export type EnqueuePostCreateUserGroupMembershipsJobArgs = Readonly<{
  userGroup: UserGroup;
  memberIds: ReadonlyArray<ID>;
}>;

export async function enqueuePostCreateUserGroupMembershipsJob(
  args: EnqueuePostCreateUserGroupMembershipsJobArgs,
): Promise<void> {
  await jobQueues.postCreateUserGroupMemberships.add(args);
}
