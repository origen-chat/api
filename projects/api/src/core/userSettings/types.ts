import { ID, Identifiable, Timestamps } from '../types';

export type UserSettings = Readonly<{
  userId: ID;
  locale: Locale;
}> &
  Identifiable &
  Timestamps;

export type Locale = 'en';
