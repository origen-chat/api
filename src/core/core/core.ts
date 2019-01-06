import { isShutdown } from './shutdown';
import { isStarted } from './start';

export function isCoreReady(): boolean {
  return isStarted && !isShutdown;
}
