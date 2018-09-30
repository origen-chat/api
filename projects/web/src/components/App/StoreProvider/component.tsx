import React from 'react';

import {
  NavBarState,
  PopModal,
  PushModal,
  SetNavBarState,
  StoreContext,
  StoreContextActions,
  StoreContextValue,
} from '../../../store';
import theme from '../../../theme';

export type StoreProviderProps = Readonly<{}>;
export type StoreProviderState = StoreContextValue;

export class StoreProvider extends React.Component<
  StoreProviderProps,
  StoreProviderState
> {
  private setNavBarState: SetNavBarState = navBarState =>
    this.setState(prevState => ({
      state: {
        ...prevState.state,
        navBarState,
      },
    }));

  private pushModal: PushModal = modal =>
    this.setState(prevState => ({
      state: {
        ...prevState.state,
        modalStack: [...prevState.state.modalStack, modal],
      },
    }));

  private popModal: PopModal = () =>
    this.setState(prevState => ({
      state: {
        ...prevState.state,
        modalStack: prevState.state.modalStack.slice(
          0,
          prevState.state.modalStack.length - 1,
        ),
      },
    }));

  private actions: StoreContextActions = {
    setNavBarState: this.setNavBarState,
    pushModal: this.pushModal,
    popModal: this.popModal,
  };

  public state: StoreProviderState = {
    state: getInitialState(),
    // eslint-disable-next-line react/no-unused-state
    actions: this.actions,
  };

  public render() {
    return (
      <StoreContext.Provider value={this.state}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

function getInitialState(): StoreProviderState['state'] {
  const initialState: StoreProviderState['state'] = {
    navBarState: getInitialNavBarState(),
    modalStack: [],
    toastQueue: [],
  };

  return initialState;
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
