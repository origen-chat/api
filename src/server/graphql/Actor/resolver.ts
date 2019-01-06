import * as core from '../../../core';
import { Actor, ActorType } from '../types';

const nodeResolver = {
  __resolveType: resolveType,
};

function resolveType(actor: Actor): ActorType | null {
  if (core.users.isUser(actor)) {
    return ActorType.User;
  }

  if (core.bots.isBot(actor)) {
    return ActorType.Bot;
  }

  return null;
}

export default nodeResolver;
