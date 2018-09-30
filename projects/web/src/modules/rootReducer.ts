import { combineReducers } from 'redux';

import { ModalStackState, reducer as modalStackReducer } from './modalStack';
import { reducer as toastQueueReducer, ToastQueueState } from './toastQueue';

/**
 * The state of the Redux store.
 */
export type State = Readonly<{
  modalStack: ModalStackState;
  toastQueue: ToastQueueState;
}>;

const rootReducer = combineReducers<State>({
  modalStack: modalStackReducer,
  toastQueue: toastQueueReducer,
});

export default rootReducer;
