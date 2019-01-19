import { jobQueues } from '../jobQueues';
import { JobProcessor } from './types';
import { UserGroup } from '../userGroups';
import { ID } from '../types';

export type ProcessPostCreateUserGroupChannelsJobData = Readonly<{
  userGroup: UserGroup;
  channelIds: ReadonlyArray<ID>;
}>;

export const processPostCreateUserGroupChannelsJob: JobProcessor<
  ProcessPostCreateUserGroupChannelsJobData
> = async job => {};

export function startListeningOnPostCreateUserGroupChannelsQueue(): void {
  jobQueues.postCreateUserGroupChannels.process(
    processPostCreateUserGroupChannelsJob,
  );
}
