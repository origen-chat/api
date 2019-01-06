import * as config from '../../config';
import logger from '../logger';
import { startListeningOnPostCreateMessageQueue } from './postCreateMessage';
import { startListeningOnPostCreateNamedChannelQueue } from './postCreateNamedChannel';
import { startListeningOnPostCreateWorkspaceQueue } from './postCreateWorkspace';
import { startListeningOnPostCreateWorkspaceInvitationQueue } from './postCreateWorkspaceInvitation';
import { startListeningOnPostRegisterUserQueue } from './postRegisterUser';
import { startListeningOnPostUpdateMessageQueue } from './postUpdateMessage';

export function startBackgroundWorkers(): void {
  if (!config.env.enableBackgroundWorkers) {
    logger.info('🐜 background workers not enabled');

    return;
  }

  startListeningOnPostRegisterUserQueue();
  startListeningOnPostCreateWorkspaceQueue();
  startListeningOnPostCreateMessageQueue();
  startListeningOnPostUpdateMessageQueue();
  startListeningOnPostCreateWorkspaceInvitationQueue();
  startListeningOnPostCreateNamedChannelQueue();

  logger.info('🐜 background workers ready');
}
