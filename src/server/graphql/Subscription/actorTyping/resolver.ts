import * as core from '../../../../core';
import { Resolver } from '../../../types';
import { ActorTypingArgs, ActorTypingPayload } from './types';

export const resolveActorTyping: Resolver<
  ActorTypingPayload,
  ActorTypingArgs,
  core.actors.Actor
> = payload => {
  const { actor } = payload;

  return actor;
};

export default resolveActorTyping;
