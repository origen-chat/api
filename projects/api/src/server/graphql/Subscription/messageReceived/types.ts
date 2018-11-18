import * as core from '../../../../core';

export type MessageReceivedArgs = Readonly<{
  workspaceId: core.types.ID;
}>;

export type MessageReceivedPayload = Readonly<{
  message: core.messages.Message;
  channel: core.channels.Channel;
  workspace: core.workspaces.Workspace;
}>;
