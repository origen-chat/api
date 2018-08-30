import React from 'react';

import {
  SetNavBarState,
  StoreContext,
  StoreContextActions,
  StoreContextState,
} from '../../store';

export type StoreProviderProps = Readonly<{}>;
export type StoreProviderState = StoreContextState;

/* eslint-disable react/no-unused-state */
export class StoreProvider extends React.Component<
  StoreProviderProps,
  StoreProviderState
> {
  public state: StoreProviderState = {
    navBarState: 'closed',
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

export default StoreProvider;
