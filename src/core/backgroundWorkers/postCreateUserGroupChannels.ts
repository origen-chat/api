import { jobQueues } from '../jobQueues';
import { JobProcessor } from './types';
import { UserGroup } from '../userGroups';
import { ID } from '../types';
import { getChannelsByIds } from '../channels';
import { getMembersInUserGroup } from '../userGroupMemberships';
import { addUsersToChannels } from '../channelMemberships';

export type ProcessPostCreateUserGroupChannelsJobData = Readonly<{
  userGroup: UserGroup;
  channelIds: ReadonlyArray<ID>;
}>;

export const processPostCreateUserGroupChannelsJob: JobProcessor<
  ProcessPostCreateUserGroupChannelsJobData
> = async job => {
  const { userGroup, channelIds } = job.data;

  const channels = await getChannelsByIds(channelIds);
  const membersInUserGroup = await getMembersInUserGroup({ userGroup });

  await addUsersToChannels(
    { users: membersInUserGroup, channels },
    { onConflictDoNothing: true },
  );
};

export function startListeningOnPostCreateUserGroupChannelsQueue(): void {
  jobQueues.postCreateUserGroupChannels.process(
    processPostCreateUserGroupChannelsJob,
  );
}
