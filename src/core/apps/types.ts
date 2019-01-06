import { Identifiable, Timestamps } from '../types';

export type App = Readonly<{
  name: string;
  publishedAt: Date;
}> &
  Identifiable &
  Timestamps;
