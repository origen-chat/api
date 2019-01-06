import * as core from '../../../core';

const workspaceMembershipRoleResolver = {
  OWNER: core.workspaceMemberships.WorkspaceMembershipRole.Owner,
  ADMIN: core.workspaceMemberships.WorkspaceMembershipRole.Admin,
  MEMBER: core.workspaceMemberships.WorkspaceMembershipRole.Member,
  GUEST: core.workspaceMemberships.WorkspaceMembershipRole.Guest,
  BOT: core.workspaceMemberships.WorkspaceMembershipRole.Bot,
};

export default workspaceMembershipRoleResolver;
