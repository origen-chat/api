import { ColorTheme } from './types';

export function isColorTheme(value: any): value is ColorTheme {
  return (
    typeof value === 'object' &&
    value &&
    value.id &&
    value.name &&
    (value.authorId || value.authorId === null) &&
    (value.colors || value.colors === null)
  );
}
