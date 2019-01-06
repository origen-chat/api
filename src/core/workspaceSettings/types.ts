import { ID, Locale, Timestamps } from '../types';

export type WorkspaceSettings = Readonly<{
  workspaceId: ID;

  requireTwoFactorAuthentication: boolean;
  locale: Locale;
}> &
  Timestamps;
