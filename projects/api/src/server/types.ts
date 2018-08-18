import { MergeInfo } from 'apollo-server-express';
import { GraphQLResolveInfo } from 'graphql';
import { types, users } from '../core';

export type Resolver<TParent = Root, TArgs = {}, TReturn = any> = (
  parentOrRoot: TParent,
  args: TArgs,
  context: Context,
  info: Info,
) => TReturn | Promise<TReturn>;

export type Root = null;

export type Context = Readonly<{
  viewer: types.Nullable<users.User>;
}>;

export type Info = GraphQLResolveInfo & { mergeInfo: MergeInfo };
