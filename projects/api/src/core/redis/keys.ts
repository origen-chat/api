import { keyNamespaceSeparator } from './constants';

export function makeRedisKey(parts: ReadonlyArray<string | number>): string {
  const key = parts.join(keyNamespaceSeparator);

  return key;
}
