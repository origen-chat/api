import pubsub from '../pubsub';
import { Reactable } from '../reactables';
import { Reaction } from '../reactions';
import { User } from '../users';
import { triggerNames } from './constants';

export type PublishReactableReactionToggledArgs = Readonly<{
  author: User;
  reactable: Reactable;
  reaction: Reaction;
}>;

export function publishReactableReactionToggled(
  args: PublishReactableReactionToggledArgs,
): void {
  pubsub.publish(triggerNames.REACTABLE_REACTED, args);
}
