import { actorTyping } from './actorTyping';
import { messageReceived } from './messageReceived';

const subscriptionResolver = {
  messageReceived,
  actorTyping,
};

export default subscriptionResolver;
