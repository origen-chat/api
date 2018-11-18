import { isRichText } from './predicates';

export function validateRichText(value: object): void {
  if (!isRichText(value)) {
    throw new Error('invalid rich text');
  }
}
