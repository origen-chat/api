import { combineReducers, Reducer } from 'redux';

import { PopModalAction, PushModalAction } from './actions';
import actionTypes from './actionTypes';

export type ModalStackState = Readonly<{
  modalStack: ModalStack;
}>;

export type ModalStack = ReadonlyArray<{}>;

const modalStackReducerInitialState: ModalStack = [];

export const modalStackReducer: Reducer<
  ModalStackState['modalStack'],
  PushModalAction | PopModalAction
> = (state = modalStackReducerInitialState, action) => {
  if (action.type === actionTypes.PUSH_MODAL) {
    const newState = [(action as PushModalAction).payload, ...state];

    return newState;
  }

  if (action.type === actionTypes.POP_MODAL) {
    if (state.length > 0) {
      const newState = state.slice(1);

      return newState;
    }
  }

  return state;
};

const reducer = combineReducers({
  modalStack: modalStackReducer,
});

export default reducer;
