import DataLoader from 'dataloader';

import * as core from '../../core';

import { makeLoader } from './helpers';

export function makeMessageByIdLoader(): DataLoader<
  core.types.ID,
  core.types.Nullable<core.messages.Message>
> {
  const loader = makeLoader({
    originalBatchLoadFunction: core.messages.getMessagesByIds,
    keyName: 'id',
  });

  return loader;
}
