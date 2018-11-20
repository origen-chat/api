import logger from '../logger';
import { startListeningOnEditedMessageNotificationsQueue } from './editedMessageNotifications';
import { startListeningOnNewMessageNotificationsQueue } from './newMessageNotifications';

export function startBackgroundWorkers(): void {
  startListeningOnNewMessageNotificationsQueue();
  startListeningOnEditedMessageNotificationsQueue();

  logger.info('🐜 background workers ready');
}
