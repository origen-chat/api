import { jobQueues } from '../jobQueues';
import { UserGroup } from '../userGroups';
import { ID } from '../types';

export type EnqueuePostCreateUserGroupChannelsJobArgs = Readonly<{
  userGroup: UserGroup;
  channelIds: ReadonlyArray<ID>;
}>;

export async function enqueuePostCreateUserGroupChannelsJob(
  args: EnqueuePostCreateUserGroupChannelsJobArgs,
): Promise<void> {
  await jobQueues.postCreateUserGroupChannels.add(args);
}
