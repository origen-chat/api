import DataLoader from 'dataloader';

import * as core from '../../core';

import { makeLoader } from './helpers';

export function makeWorkspaceByIdLoader(): DataLoader<
  core.types.ID,
  core.types.Nullable<core.workspaces.Workspace>
> {
  const loader = makeLoader({
    originalBatchLoadFunction: core.workspaces.getWorkspacesByIds,
    keyName: 'id',
  });

  return loader;
}

export function makeWorkspaceByNameLoader(): DataLoader<
  string,
  core.types.Nullable<core.workspaces.Workspace>
> {
  const loader = makeLoader({
    originalBatchLoadFunction: core.workspaces.getWorkspacesByNames,
    keyName: 'name',
  });

  return loader;
}
