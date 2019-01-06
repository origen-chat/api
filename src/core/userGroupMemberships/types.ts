import { ID, Identifiable, Timestamps } from '../types';

export type UserGroupMembership = Readonly<{
  userId: ID;
  userGroupId: ID;
}> &
  Identifiable &
  Timestamps;
