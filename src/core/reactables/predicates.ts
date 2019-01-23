import { isMessage } from '../messages';

import { Reactable } from './types';

export function isReactable(value: any): value is Reactable {
  return isMessage(value);
}
