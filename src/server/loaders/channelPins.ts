import DataLoader from 'dataloader';

import * as core from '../../core';

import { makeLoader } from './helpers';

export function makeChannelPinByIdLoader(): DataLoader<
  core.types.ID,
  core.channelPins.ChannelPin | null
> {
  const loader = makeLoader({
    originalBatchLoadFunction: core.channelPins.getChannelPinsByIds,
    keyName: 'id',
  });

  return loader;
}
