import * as core from '../core';

import { Loaders } from './loaders';

export type Resolver<TParent = Root, TArgs = {}, TReturn = any> = (
  parentOrRoot: TParent,
  args: TArgs,
  context: Context,
  info: Info,
) => TReturn | Promise<TReturn>;

export type Root = null;

export type Context = Readonly<{
  viewer: core.actors.Actor | null;
  userViewerId?: core.types.ID | null;
  botViewerId?: core.types.ID | null;
  loaders: Loaders;
}>;

export type Info = any;

export type MutationInputArg<TInput extends {}> = Readonly<{
  input: Readonly<TInput>;
}>;
