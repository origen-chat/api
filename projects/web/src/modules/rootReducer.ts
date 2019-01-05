import { combineReducers } from 'redux';

import {
  actions as modalStackActions,
  ModalStackReduxState,
  reducer as modalStackReducer,
} from './modalStack';
// import {
//   actions as navBarActions,
//   NavBarReduxState,
//   reducer as navBarReducer,
// } from './navBar';

export type ReduxState = Readonly<{
  // navBar: NavBarReduxState;
  modalStack: ModalStackReduxState;
}>;

export type Actions = modalStackActions.ModalStackActions;
// | navBarActions.NavBarActions;

const rootReducer = combineReducers<ReduxState, Actions>({
  // navBar: navBarReducer,
  modalStack: modalStackReducer,
});

export default rootReducer;
