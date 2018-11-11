import logger from '../logger';
import { startListeningOnNewMessageNotificationsQueue } from './newMessageNotifications';

export function startBackgroundWorkers(): void {
  startListeningOnNewMessageNotificationsQueue();

  logger.info('🐜 background workers ready');
}
