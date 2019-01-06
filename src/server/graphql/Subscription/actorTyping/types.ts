import * as core from '../../../../core';

export type ActorTypingArgs = Readonly<{
  channelId: core.types.ID;
}>;

export type ActorTypingPayload = Readonly<{
  actor: core.actors.Actor;
  channel: core.channels.Channel;
}>;
