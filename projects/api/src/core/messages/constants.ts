import { makePubsubKeys } from '../pubsub';

export const messagesTableName = 'messages';

const moduleNamespace = 'messages';

export const pubsubKeys = makePubsubKeys(
  ['MESSAGE_SENT', 'MESSAGE_EDITED', 'MESSAGE_DELETED'],
  moduleNamespace,
);
