import { Actor } from '../actors';
import { Channel } from '../channels';
import { publishActorTyping } from './publishers';

export type BroadcastTypingArgs = Readonly<{
  channel: Channel;
  actor: Actor;
}>;

export async function broadcastTyping(
  args: BroadcastTypingArgs,
): Promise<Channel> {
  publishActorTyping(args.actor, args.channel);

  return args.channel;
}
