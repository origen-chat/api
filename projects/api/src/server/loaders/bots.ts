import DataLoader from 'dataloader';

import * as core from '../../core';
import { makeLoader } from './helpers';

export function makeBotByIdLoader(): DataLoader<
  core.types.ID,
  core.bots.Bot | null
> {
  const loader = makeLoader({
    originalBatchLoadFunction: core.bots.getBotsByIds,
    keyName: 'id',
  });

  return loader;
}
