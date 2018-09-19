import React from 'react';

import {
  NavBarState,
  PopModal,
  PushModal,
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
    modalStack: [],
  };

  private setNavBarState: SetNavBarState = navBarState =>
    this.setState({ navBarState });

  private pushModal: PushModal = modal =>
    this.setState(prevState => ({
      modalStack: [...prevState.modalStack, modal],
    }));

  private popModal: PopModal = () =>
    this.setState(prevState => ({
      modalStack: prevState.modalStack.slice(
        0,
        prevState.modalStack.length - 1,
      ),
    }));

  private actions: StoreContextActions = {
    setNavBarState: this.setNavBarState,
    pushModal: this.pushModal,
    popModal: this.popModal,
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
