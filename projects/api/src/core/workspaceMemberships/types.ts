import { Bot } from '../bots';
import { ID, Identifiable, Timestamps } from '../types';
import { User } from '../users';

export type WorkspaceMembership =
  | UserWorkspaceMembership
  | BotWorkspaceMembership;

export type UserWorkspaceMembership = Readonly<{
  userMemberId: ID;
  botMemberId: null;
}> &
  WorkspaceMembershipSharedData;

export type BotWorkspaceMembership = Readonly<{
  userMemberId: null;
  botMemberId: ID;
}> &
  WorkspaceMembershipSharedData;

type WorkspaceMembershipSharedData = Readonly<{
  workspaceId: ID;

  /**
   * The role of the member in the workspace.
   */
  role: WorkspaceMembershipRole;
}> &
  Identifiable &
  Timestamps;

/**
 * The membership role in a workspace.
 */
export enum WorkspaceMembershipRole {
  /**
   * The owner of the worspace.
   */
  Owner = 'owner',
  Admin = 'admin',
  Member = 'member',

  /**
   * Bots can only have this role in a workspace.
   */
  Bot = 'bot',
}

export type WorkspaceMember = User | Bot;
