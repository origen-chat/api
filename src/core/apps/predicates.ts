import { App } from './types';

export function isApp(value: any): value is App {
  return (
    typeof value === 'object' &&
    value &&
    value.id &&
    value.name &&
    (value.publishedAt || value.publishedAt === null)
  );
}
