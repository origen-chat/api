import React from 'react';

import {
  NavBarState,
  SetNavBarState,
  StoreContext,
  StoreContextActions,
  StoreContextState,
} from '../../../store';
import theme from '../../../theme';

export type StoreProviderProps = Readonly<{}>;
export type StoreProviderState = StoreContextState;

/* eslint-disable react/no-unused-state */
export class StoreProvider extends React.Component<
  StoreProviderProps,
  StoreProviderState
> {
  public state: StoreProviderState = {
    navBarState: getInitialNavBarState(),
  };

  private setNavBarState: SetNavBarState = navBarState =>
    this.setState({ navBarState });

  private actions: StoreContextActions = {
    setNavBarState: this.setNavBarState,
  };

  public render() {
    return (
      <StoreContext.Provider
        value={{ state: this.state, actions: this.actions }}
      >
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

function getInitialNavBarState(): NavBarState {
  const minWidthBreakpointLgMediaQueryMatches = window.matchMedia(
    `(min-width: ${theme.breakpoints.lg})`,
  ).matches;

  if (minWidthBreakpointLgMediaQueryMatches) {
    return 'open';
  }

  return 'closed';
}

export default StoreProvider;
