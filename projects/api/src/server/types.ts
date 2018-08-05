import { users } from '../core';

export type Resolver<TParent, TArgs = {}> = (
  parentOrRoot: TParent | Root,
  args: TArgs,
  context: Context,
  info: any,
) => any;

export type Root = null;

export type Context = Readonly<{
  viewer: users.User | null;
}>;
