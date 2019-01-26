import * as core from '../core';

import { shutdownApplication } from './shutdown';

const signals: ReadonlyArray<NodeJS.Signals> = ['SIGINT', 'SIGTERM'];

export function handleSignals(): void {
  signals.forEach(handleSignal);
}

function handleSignal(signal: NodeJS.Signals): void {
  process.once(signal, async () => {
    core.logger.info(`📞 received ${signal} signal`);

    await shutdownApplication({ exitCode: 1 });
  });
}
