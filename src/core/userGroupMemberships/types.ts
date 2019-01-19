import { ID, Identifiable, Timestamps } from '../types';

export type UserGroupMembership = Readonly<{
  memberId: ID;
  userGroupId: ID;
}> &
  Identifiable &
  Timestamps;
