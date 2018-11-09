import { makeUserByIdLoader } from './users';
import { makeWorkspaceByIdLoader } from './workspaces';

export function makeLoaders() {
  const loaders = {
    userByIdLoader: makeUserByIdLoader(),
    workspacesByIdLoader: makeWorkspaceByIdLoader(),
  };

  return loaders;
}

export type Loaders = ReturnType<typeof makeLoaders>;
