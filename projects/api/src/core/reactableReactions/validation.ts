import { isChannelMember } from '../channelMemberships/predicates';
import { getChannelById } from '../channels';
import { isMessage } from '../messages';
import { ToggleReactableReactionArgs } from './reactableReactions';

export async function validateToggleReactableReactionArgs(
  args: ToggleReactableReactionArgs,
): Promise<void> {
  if (isMessage(args.reactable)) {
    const channel = await getChannelById(args.reactable.channelId);

    if (!channel) {
      throw new Error('no channel');
    }

    if (!(await isChannelMember(channel, args.author))) {
      throw new Error('user is not a member of the channel');
    }
  }
}
