import * as core from '../../../core';

export type Actor = core.users.User | core.bots.Bot;

export enum ActorType {
  User = 'User',
  Bot = 'Bot',
}
