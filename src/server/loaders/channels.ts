import DataLoader from 'dataloader';

import * as core from '../../core';
import { makeLoader } from './helpers';

export function makeChannelByIdLoader(): DataLoader<
  core.types.ID,
  core.types.Nullable<core.channels.Channel>
> {
  const loader = makeLoader({
    originalBatchLoadFunction: core.channels.getChannelsByIds,
    keyName: 'id',
  });

  return loader;
}
