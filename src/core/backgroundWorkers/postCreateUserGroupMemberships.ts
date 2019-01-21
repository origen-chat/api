import { jobQueues } from '../jobQueues';
import { JobProcessor } from './types';
import { UserGroup } from '../userGroups';
import { ID } from '../types';
import { getUsersByIds } from '../users';
import { addUsersToChannels } from '../channelMemberships';
import { getChannelsInUserGroup } from '../userGroupChannels';

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
