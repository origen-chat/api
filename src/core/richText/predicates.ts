import { RichText } from './types';

export function isRichText(value: object): value is RichText {
  return true;
}
