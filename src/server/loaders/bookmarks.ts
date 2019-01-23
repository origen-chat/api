import DataLoader from 'dataloader';

import * as core from '../../core';

import { makeLoader } from './helpers';

export function makeBookmarkByIdLoader(): DataLoader<
  core.types.ID,
  core.bookmarks.Bookmark | null
> {
  const loader = makeLoader({
    originalBatchLoadFunction: core.bookmarks.getBookmarksByIds,
    keyName: 'id',
  });

  return loader;
}
