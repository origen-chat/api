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
  modalStack: ModalStack;
}>;

export type NavBarState = 'closed' | 'halfOpen' | 'open';

export type ModalStack = ReadonlyArray<React.ReactNode>;

export type StoreContextActions = Readonly<{
  setNavBarState: SetNavBarState;
  pushModal: PushModal;
  popModal: PopModal;
}>;

export type SetNavBarState = (navBarState: NavBarState) => void;

export type PushModal = (modal: React.ReactNode) => void;

export type PopModal = () => void;

export default StoreContext;
