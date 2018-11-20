import { makePubsubKeys } from '../pubsub';

export const reactableReactionsTableName = 'reactableReactions';

const moduleNamespace = 'reactableReactions';

export const pubsubKeys = makePubsubKeys(
  ['REACTABLE_REACTED'],
  moduleNamespace,
);
