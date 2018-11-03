import { makeTriggerNames } from '../pubsub';

export const reactableReactionsTableName = 'reactableReactions';

const moduleNamespace = 'reactableReactions';

export const triggerNames = makeTriggerNames(
  ['REACTABLE_REACTED'],
  moduleNamespace,
);
