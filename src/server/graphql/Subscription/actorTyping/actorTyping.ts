import actorTypingReceived from './resolver';
import actorTypingSubscriber from './subscriber';

export const actorTyping = {
  subscribe: actorTypingSubscriber,
  resolve: actorTypingReceived,
};
