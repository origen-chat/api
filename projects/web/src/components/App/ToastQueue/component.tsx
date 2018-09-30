import { equals } from 'ramda';
import React from 'react';

import { ToastArgs, ToastQueue as ToastQueueType } from '../../../store';
import StoreConsumer from '../../StoreConsumer';

export type BaseToastQueueProps = Readonly<{
  toastQueue: ToastQueueType;
}>;

export type BaseToastQueueState = Readonly<{
  currentToastArgs: ToastArgs;
}>;

export class BaseToastQueue extends React.Component<
  BaseToastQueueProps,
  BaseToastQueueState
> {
  public static getDerivedStateFromProps(
    nextProps: BaseToastQueueProps,
    prevState: BaseToastQueueState,
  ): BaseToastQueueState | null {
    if (equals(nextProps.toastQueue[0], prevState.currentToastArgs)) {
      return null;
    }

    return { currentToastArgs: nextProps.toastQueue[0] };
  }

  public componentDidUpdate(
    prevProps: BaseToastQueueProps,
    prevState: BaseToastQueueState,
  ) {
    if (prevState.currentToastArgs.id === this.state.currentToastArgs.id) {
      this.resetToastTimeout();
    }
  }

  private resetToastTimeout() {}

  public shouldComponentUpdate(
    nextProps: BaseToastQueueProps,
    nextState: BaseToastQueueState,
  ): boolean {
    if (equals(this.state.currentToastArgs, nextState.currentToastArgs)) {
      return false;
    }

    return true;
  }

  private currentToastTimeoutId: number | null = null;

  public render() {
    return <div>toast</div>;
  }
}

export const ToastQueue: React.SFC = () => (
  <StoreConsumer>
    {store => <BaseToastQueue toastQueue={store.state.toastQueue} />}
  </StoreConsumer>
);

export default ToastQueue;
