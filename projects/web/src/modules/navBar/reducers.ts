import { combineReducers, Reducer } from 'redux';

import theme from '../../theme';
import { SetStateAction } from './actions';
import actionTypes from './actionTypes';

export type NavBarReduxState = Readonly<{
  state: NavBarState;
}>;

export type NavBarState = 'open' | 'halfOpen' | 'closed';

const navBarReducerInitialState: NavBarState = getInitialNavBarState();

function getInitialNavBarState(): NavBarState {
  const minWidthBreakpointLgMediaQueryMatches = window.matchMedia(
    `(min-width: ${theme.breakpoints.lg})`,
  ).matches;

  if (minWidthBreakpointLgMediaQueryMatches) {
    return 'open';
  }

  return 'closed';
}

export const stateReducer: Reducer<
  NavBarReduxState['state'],
  SetStateAction
> = (state = navBarReducerInitialState, action) => {
  if (action.type === actionTypes.SET_STATE) {
    const newState = action.payload.state;

    return newState;
  }

  return state;
};

const reducer = combineReducers({
  state: stateReducer,
});

export default reducer;
