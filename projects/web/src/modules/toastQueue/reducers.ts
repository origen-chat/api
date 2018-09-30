import { combineReducers, Reducer } from 'redux';

import {
  EnqueueToastAction,
  RemoveToastAction,
  ToastProps,
  UpdateToastAction,
} from './actions';
import actionTypes from './actionTypes';

export type ToastQueueState = Readonly<{
  toastQueue: ToastQueue;
}>;

const toastQueueInitialState: ToastQueue = [];

export type ToastQueue = ReadonlyArray<ToastProps>;

export const toastQueueReducer: Reducer<
  ToastQueueState['toastQueue'],
  EnqueueToastAction | RemoveToastAction | UpdateToastAction
> = (state = toastQueueInitialState, action) => {
  if (action.type === actionTypes.ENQUEUE_TOAST) {
    const newState = [...state, action.payload];

    return newState;
  }

  if (action.type === actionTypes.REMOVE_TOAST) {
    const newState = state.filter(
      toastArgs => toastArgs.id !== action.payload.id,
    );

    return newState;
  }

  if (action.type === actionTypes.UPDATE_TOAST) {
    const newState = state.map(toastArgs => {
      if (toastArgs.id === action.payload.id) {
        return { ...toastArgs, ...action.payload };
      }

      return toastArgs;
    });

    return newState;
  }

  return state;
};

const reducer = combineReducers({
  toastQueue: toastQueueReducer,
});

export default reducer;
