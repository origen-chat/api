import handlePush from './handlePush';

export function initializeServiceWorker() {
  self.addEventListener('push', handlePush);
}
