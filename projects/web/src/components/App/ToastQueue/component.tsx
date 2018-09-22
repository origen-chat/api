import React from 'react';

import { ToastQueue as ToastQueueType } from '../../../store';
import StoreConsumer from '../../StoreConsumer';

export type BaseToastQueueProps = Readonly<{
  toastQueue: ToastQueueType;
}>;

export const BaseToastQueue: React.SFC<BaseToastQueueProps> = props => null;

export const ToastQueue: React.SFC = () => (
  <StoreConsumer>
    {store => <BaseToastQueue toastQueue={store.state.toastQueue} />}
  </StoreConsumer>
);

export default ToastQueue;
