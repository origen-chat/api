import { ReduxState } from '../rootReducer';
import { NavBarState } from './reducers';

export function getNavBarState(state: ReduxState): NavBarState {
  const navBarState = state.navBar.state;

  return navBarState;
}
