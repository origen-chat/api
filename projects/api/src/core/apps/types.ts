import { Identifiable, Timestamps } from '../types';

export type App = Readonly<{
  name: string;
}> &
  Identifiable &
  Timestamps;
