import { types, users } from '../core';
import { Loaders } from './loaders';

export type Resolver<TParent = Root, TArgs = {}, TReturn = any> = (
  parentOrRoot: TParent,
  args: TArgs,
  context: Context,
  info: Info,
) => TReturn | Promise<TReturn>;

export type Root = null;

export type Context = Readonly<{
  viewer: types.Nullable<users.User>;
  loaders: Loaders;
}>;

export type Info = any;

export type MutationInputArg<TInput extends {}> = Readonly<{
  input: Readonly<TInput>;
}>;
