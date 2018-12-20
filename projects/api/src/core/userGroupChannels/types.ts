import { ID, Identifiable, Timestamps } from '../types';

export type UserGroupChannel = Readonly<{
  userGroupId: ID;
  channelId: ID;
}> &
  Identifiable &
  Timestamps;
