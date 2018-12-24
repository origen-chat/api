import { ID, Locale, Timestamps, Timezone } from '../types';

export type UserSettings = Readonly<{
  userId: ID;

  locale: Locale;
  timezone: Timezone | null;

  colorThemeId: ID | null;
}> &
  Timestamps;
