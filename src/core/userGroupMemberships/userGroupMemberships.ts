import { DBOptions } from '../types';
import { UserGroupMembership } from './types';
import {
  CreateUserGroupMembershipsArgs,
  createUserGroupMemberships,
} from './creation';
import { User } from '../users';
import { UserGroup } from '../userGroups';

export type AddUserToUserGroupArgs = Readonly<{
  user: User;
  userGroup: UserGroup;
}>;

export async function addUserToUserGroup(
  args: AddUserToUserGroupArgs,
  options: DBOptions = {},
): Promise<UserGroupMembership> {
  const [userGroupMembership] = await addUsersToUserGroup({
    userGroup: args.userGroup,
    users: [args.user],
  });

  return userGroupMembership;
}

export type AddUsersToUserGroupArgs = CreateUserGroupMembershipsArgs;

export async function addUsersToUserGroup(
  args: AddUsersToUserGroupArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserGroupMembership>> {
  const userGroupMemberships = await createUserGroupMemberships(args, options);

  return userGroupMemberships;
}
