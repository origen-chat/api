import { makeTriggerNames } from '../pubsub';

export const messagesTableName = 'messages';

const moduleNamespace = 'messages';

export const triggerNames = makeTriggerNames(
  ['MESSAGE_SENT', 'MESSAGE_UPDATED', 'MESSAGE_DELETED'],
  moduleNamespace,
);
