import resolveMessageReceived from './resolver';
import messageReceivedSubscriber from './subscriber';

export const messageReceived = {
  subscribe: messageReceivedSubscriber,
  resolve: resolveMessageReceived,
};
