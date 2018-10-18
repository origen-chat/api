import { ValidationError } from '../errors';

export function validateNonNull<TKeys extends string>(
  keys: ReadonlyArray<TKeys>,
  object: Readonly<{ [key in TKeys]: unknown }>,
): void {
  keys.forEach(key => {
    if (object[key] === null) {
      throw new ValidationError(`${key} cannot be null`);
    }
  });
}
