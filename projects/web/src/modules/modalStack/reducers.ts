import { combineReducers, Reducer } from 'redux';

import { PopModalAction, PushModalAction } from './actions';
import actionTypes from './actionTypes';

export type ModalStackReduxState = Readonly<{
  modalPropsStack: ModalPropsStack;
}>;

export type ModalPropsStack = ReadonlyArray<{
  type: string;
  [name: string]: any;
}>;

const modalPropsStackReducerInitialState: ModalPropsStack = [];

export const modalPropsStackReducer: Reducer<
  ModalStackReduxState['modalPropsStack'],
  PushModalAction | PopModalAction
> = (state = modalPropsStackReducerInitialState, action) => {
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

const modalStackReducer = combineReducers({
  modalPropsStack: modalPropsStackReducer,
});

export default modalStackReducer;
