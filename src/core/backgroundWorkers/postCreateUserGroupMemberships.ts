import { jobQueues } from '../jobQueues';
import { UserGroup } from '../userGroups';
import { ID } from '../types';
import { getUsersByIds } from '../users';
import { addUsersToChannels } from '../channelMemberships';
import { getChannelsInUserGroup } from '../userGroupChannels';

import { JobProcessor } from './types';

export type ProcessPostCreateUserGroupMembershipsJobData = Readonly<{
  userGroup: UserGroup;
  memberIds: ReadonlyArray<ID>;
}>;

export const processPostCreateUserGroupMembershipsJob: JobProcessor<
  ProcessPostCreateUserGroupMembershipsJobData
> = async job => {
  const { userGroup, memberIds } = job.data;
  const members = await getUsersByIds(memberIds);
  const channelsInUserGroup = await getChannelsInUserGroup({ userGroup });

  await addUsersToChannels(
    { users: members, channels: channelsInUserGroup },
    { onConflictDoNothing: true },
  );
};

export function startListeningOnPostCreateUserGroupMembershipsQueue(): void {
  jobQueues.postCreateUserGroupMemberships.process(
    processPostCreateUserGroupMembershipsJob,
  );
}
