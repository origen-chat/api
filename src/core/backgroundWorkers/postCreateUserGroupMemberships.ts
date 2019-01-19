import { jobQueues } from '../jobQueues';
import { JobProcessor } from './types';
import { UserGroup } from '../userGroups';
import { ID } from '../types';

export type ProcessPostCreateUserGroupMembershipsJobData = Readonly<{
  userGroup: UserGroup;
  memberIds: ReadonlyArray<ID>;
}>;

export const processPostCreateUserGroupMembershipsJob: JobProcessor<
  ProcessPostCreateUserGroupMembershipsJobData
> = async job => {};

export function startListeningOnPostCreateUserGroupMembershipsQueue(): void {
  jobQueues.postCreateUserGroupMemberships.process(
    processPostCreateUserGroupMembershipsJob,
  );
}
