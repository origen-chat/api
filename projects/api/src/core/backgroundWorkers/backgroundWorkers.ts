import logger from '../logger';
import { startListeningOnEditedMessageNotificationsQueue } from './editedMessageNotifications';
import { startListeningOnNewMessageNotificationsQueue } from './newMessageNotifications';
import { startListeningOnPostUserRegistrationQueue } from './postUserRegistration';

export function startBackgroundWorkers(): void {
  startListeningOnPostUserRegistrationQueue();
  startListeningOnNewMessageNotificationsQueue();
  startListeningOnEditedMessageNotificationsQueue();

  logger.info('🐜 background workers ready');
}
