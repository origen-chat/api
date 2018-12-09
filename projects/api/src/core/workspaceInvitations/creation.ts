import { doInTransaction, insertIntoDB } from '../db';
import { DBOptions, Email } from '../types';
import { User } from '../users';
import { Workspace } from '../workspaces';
import { workspaceInvitationsTableName } from './constants';
import { enqueuePostCreateWorkspaceInvitationJob } from './jobs';
import { WorkspaceInvitation, WorkspaceInvitationStatus } from './types';

export type CreateWorkspaceInvitationArgs = InsertWorkspaceInvitationIntoDBArgs;

export async function createWorkspaceInvitation(
  args: CreateWorkspaceInvitationArgs,
  options: DBOptions = {},
): Promise<WorkspaceInvitation> {
  const workspaceMembership = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { ...options, transaction };

    const createdWorkspaceInvitation = await insertWorkspaceInvitationIntoDB(
      args,
      optionsWithTransaction,
    );

    await enqueuePostCreateWorkspaceInvitationJob(createdWorkspaceInvitation);

    return createdWorkspaceInvitation;
  }, options);

  return workspaceMembership;
}

export type InsertWorkspaceInvitationIntoDBArgs = Pick<
  WorkspaceInvitation,
  'role'
> &
  Readonly<
    { workspace: Workspace; inviter: User } & (
      | { invitee: User; inviteeEmail?: null }
      | { inviteeEmail: Email; invitee?: null })
  >;

export async function insertWorkspaceInvitationIntoDB(
  args: InsertWorkspaceInvitationIntoDBArgs,
  options: DBOptions = {},
): Promise<WorkspaceInvitation> {
  const doInsertWorkspaceInvitationArgs = makeDoInsertWorkspaceInvitationIntoDBArgs(
    args,
  );

  const workspaceInvitation = await doInsertWorkspaceInvitationIntoDB(
    doInsertWorkspaceInvitationArgs,
    options,
  );

  return workspaceInvitation;
}

function makeDoInsertWorkspaceInvitationIntoDBArgs(
  args: InsertWorkspaceInvitationIntoDBArgs,
): DoInsertWorkspaceInvitationIntoDBArgs {
  const doInsertWorkspaceInvitationIntoDBArgs: DoInsertWorkspaceInvitationIntoDBArgs = {
    workspaceId: args.workspace.id,
    inviterId: args.inviter.id,
    role: args.role,
    status: WorkspaceInvitationStatus.Pending,
    inviteeEmail: args.inviteeEmail ? args.inviteeEmail : null,
    inviteeId: args.invitee ? args.invitee.id : null,
  };

  return doInsertWorkspaceInvitationIntoDBArgs;
}

export type DoInsertWorkspaceInvitationIntoDBArgs = Pick<
  WorkspaceInvitation,
  'workspaceId' | 'inviterId' | 'inviteeId' | 'inviteeEmail' | 'role' | 'status'
>;

export async function doInsertWorkspaceInvitationIntoDB(
  args: DoInsertWorkspaceInvitationIntoDBArgs,
  options: DBOptions = {},
): Promise<WorkspaceInvitation> {
  const workspaceInvitation = await insertIntoDB(
    { data: args, tableName: workspaceInvitationsTableName },
    options,
  );

  return workspaceInvitation;
}
