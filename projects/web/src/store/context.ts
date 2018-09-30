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
  toastQueue: ToastQueue;
}>;

export type NavBarState = 'closed' | 'halfOpen' | 'open';

export type ModalStack = ReadonlyArray<React.ReactNode>;

export type ToastQueue = ReadonlyArray<ToastArgs>;

export type ToastArgs = Readonly<{
  id: string;
}>;

export type StoreContextActions = Readonly<{
  setNavBarState: SetNavBarState;
  pushModal: PushModal;
  popModal: PopModal;
  enqueueToast: EnqueueToast;
}>;

export type SetNavBarState = (navBarState: NavBarState) => void;

export type PushModal = (modal: React.ReactNode) => void;

export type PopModal = () => void;

export type EnqueueToast = (args: EnqueueToastArgs) => void;

export type EnqueueToastArgs = Readonly<{}>;

export default StoreContext;
