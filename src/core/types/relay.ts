import { Base64 } from './helpers';
import { NonNegativeInteger } from './numbers';

/**
 * A Relay connection.
 *
 * See https://facebook.github.io/relay/graphql/connections.htm
 * for more information.
 */
export type Connection<
  TNode,
  TExtraConnectionData = {},
  TExtraEdgeData = {}
> = Readonly<{
  pageInfo: PageInfo;
  totalCount: NonNegativeInteger;
  edges: ReadonlyArray<Edge<TNode, TExtraEdgeData>>;
}> &
  TExtraConnectionData;

export type PageInfo = Readonly<{
  startCursor: Cursor | null;
  endCursor: Cursor | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}>;

export type Edge<TNode, TExtraData = {}> = Readonly<{
  cursor: Cursor;
  node: TNode;
}> &
  TExtraData;

export type Cursor = Base64;

export type CursorData = Readonly<{
  order: ReadonlyArray<string>;
}>;

export type PaginationArgs = ForwardPaginationArgs | BackwardPaginationArgs;

export type ForwardPaginationArgs = Readonly<{
  first: NonNegativeInteger;
  after?: Cursor;
}>;

export type BackwardPaginationArgs = Readonly<{
  last: NonNegativeInteger;
  before?: Cursor;
}>;
