import * as core from '../../../../core';

import { getViewerOrThrowIfUnauthenticated } from '../../../helpers';
import { Resolver } from '../../../types';
import { AuthorizationError } from '../../errors';

export type ResolveSettingsArgs = Readonly<{}>;

export const resolveSettings: Resolver<
  core.users.User,
  ResolveSettingsArgs,
  core.userSettings.UserSettings
> = async (user, args, context) => {
  const viewer = getViewerOrThrowIfUnauthenticated(context);

  const isViewer = viewer.id === user.id;

  if (!isViewer) {
    throw new AuthorizationError();
  }

  // eslint-disable-next-line typescript/no-non-null-assertion
  const userSettings = (await core.userSettings.getUserSettingsByUser(user))!;

  return userSettings;
};

const enhancedResolver = resolveSettings;

export default enhancedResolver;
