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

  return loader;
}

export function makeUserByEmailLoader(): DataLoader<
  core.types.Email,
  core.types.Nullable<core.users.User>
> {
  const loader = makeLoader({
    originalBatchLoadFunction: core.users.getUsersByEmails,
    keyName: 'email',
  });

  return loader;
}

export function makeUserByUniqueUsernameLoader(): DataLoader<
  core.users.UniqueUsername,
  core.types.Nullable<core.users.User>
> {
  const loader = makeLoader({
    originalBatchLoadFunction: core.users.getUsersByUniqueUsernames,
    normalizeFunction: key => value =>
      value.username === key.username &&
      value.usernameIdentifier === key.usernameIdentifier,
  });

  return loader;
}
