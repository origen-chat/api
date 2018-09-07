import React from 'react';

export type StoreContextValue = Readonly<{
  state: StoreContextState;
  actions: StoreContextActions;
}>;

const defaultValue = {};
const StoreContext = React.createContext<StoreContextValue>(
  defaultValue as any,
);

export type StoreContextState = Readonly<{
  navBarState: NavBarState;
}>;

export type StoreContextActions = Readonly<{
  setNavBarState: SetNavBarState;
}>;

export type SetNavBarState = (navBarState: NavBarState) => void;

export type NavBarState = 'closed' | 'halfOpen' | 'open';

export default StoreContext;
