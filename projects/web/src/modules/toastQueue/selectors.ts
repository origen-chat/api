import { State } from '../rootReducer';
import { ToastQueue } from './reducers';

export function getToastQueue(state: State): ToastQueue {
  const { toastQueue } = state.toastQueue;

  return toastQueue;
}
