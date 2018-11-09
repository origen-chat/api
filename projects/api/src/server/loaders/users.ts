import DataLoader from 'dataloader';

import * as core from '../../core';
import { makeLoader } from './helpers';

export function makeUserByIdLoader(): DataLoader<
  core.types.ID,
  core.types.Nullable<core.users.User>
> {
  const loader = makeLoader({
    originalBatchLoadFunction: core.users.getUsersByIds,
    keyName: 'id',
  });

  return loader as any;
}
