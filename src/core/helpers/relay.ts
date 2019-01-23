import { QueryBuilder } from 'knex';
import { drop, dropLast, omit, pick, reverse } from 'ramda';

import { maybeAddTransactionToQuery } from '../db';
import {
  BackwardPaginationArgs,
  ComparisonOperator,
  Connection,
  Cursor,
  CursorData,
  DBOptions,
  Edge,
  ForwardPaginationArgs,
  NonNegativeInteger,
  OrderByDirection,
  PageInfo,
  PaginationArgs,
} from '../types';

import { decodeCursor, encodeCursor } from './cursors';

export type MakeConnectionFromQueryArgs<TNode> = Readonly<{
  orderBy: OrderBy;
  paginationArgs: PaginationArgs;
  edgeFields?: ReadonlyArray<string>;
  transformEdge?: TransformEdge<TNode>;
}>;

export type OrderBy = ReadonlyArray<OrderByEntry>;

export type OrderByEntry = Readonly<{
  columnName: string;
  direction: OrderByDirection;
}>;

export type TransformEdge<TNode> = (edge: Edge<TNode>) => Edge<TNode>;

export async function makeConnectionFromQuery<TNode>(
  query: QueryBuilder,
  args: MakeConnectionFromQueryArgs<TNode>,
  options: DBOptions = {},
): Promise<Connection<TNode>> {
  const originalQuery = query.clone();

  const orderBy = getOrderBy(args.orderBy, args.paginationArgs);
  const limit = getLimit(args.paginationArgs);

  addWhereClausesForPagination(query, orderBy, args.paginationArgs);
  addOrderByClausesForPagination(query, orderBy);

  query.limit(limit);

  maybeAddTransactionToQuery(query, options);

  const [rows, totalCount] = await Promise.all([
    query,
    getTotalCount(originalQuery, options),
  ]);

  const sortedRows = sortRows(rows, args.paginationArgs);
  const edgeFields = args.edgeFields || [];

  const edges = makeEdges<TNode>({
    rows: sortedRows,
    orderBy: args.orderBy,
    paginationArgs: args.paginationArgs,
    limit,
    edgeFields,
    transformEdge: args.transformEdge,
  });
  const pageInfo = makePageInfo({
    paginationArgs: args.paginationArgs,
    rows: sortedRows,
    edges,
    limit,
  });

  const connection: Connection<TNode> = { edges, pageInfo, totalCount };

  return connection;
}

function isForwardPaginationArgs(
  paginationArgs: PaginationArgs,
): paginationArgs is ForwardPaginationArgs {
  if (typeof (paginationArgs as ForwardPaginationArgs).first === 'number') {
    return true;
  }

  return false;
}

function getOrderBy(
  naiveOrderBy: OrderBy,
  paginationArgs: PaginationArgs,
): OrderBy {
  let orderByWithCorrectDirections;

  if (isBackwardPaginationArgs(paginationArgs)) {
    orderByWithCorrectDirections = naiveOrderBy.map(flipOrderByDirection);
  } else {
    orderByWithCorrectDirections = naiveOrderBy;
  }

  return orderByWithCorrectDirections;
}

function isBackwardPaginationArgs(
  paginationArgs: PaginationArgs,
): paginationArgs is BackwardPaginationArgs {
  if ((paginationArgs as BackwardPaginationArgs).last) {
    return true;
  }

  return false;
}

function flipOrderByDirection(orderByEntry: OrderByEntry): OrderByEntry {
  const orderByEntryWithFlippedDirection: OrderByEntry = {
    columnName: orderByEntry.columnName,
    direction:
      orderByEntry.direction === OrderByDirection.ASC
        ? OrderByDirection.DESC
        : OrderByDirection.ASC,
  };

  return orderByEntryWithFlippedDirection;
}

function getLimit(paginationArgs: PaginationArgs): NonNegativeInteger {
  let quantity: NonNegativeInteger;

  if (isForwardPaginationArgs(paginationArgs)) {
    quantity = paginationArgs.first;
  } else {
    quantity = paginationArgs.last;
  }

  const limit = quantity + 1;

  return limit;
}

function addWhereClausesForPagination(
  query: QueryBuilder,
  orderBy: OrderBy,
  paginationArgs: PaginationArgs,
): QueryBuilder {
  const separatedOrderings = separateArray(orderBy);

  const cursorData = getCursorData(paginationArgs);

  if (!cursorData) {
    return query;
  }

  const separatedOrderValues = separateArray(cursorData.order);

  query.where(queryBuilder => {
    separatedOrderings.forEach((ordering, orderingIndex) => {
      queryBuilder.orWhere(queryBuilder2 => {
        addPartialWhereClauses(
          queryBuilder2,
          ordering,
          separatedOrderValues[orderingIndex],
        );
      });
    });
  });

  return query;
}

function addPartialWhereClauses(
  query: QueryBuilder,
  orderBy: OrderBy,
  orderValues: ReadonlyArray<any>,
): QueryBuilder {
  orderBy.forEach((orderByEntry, index) => {
    const comparisonOperator = getComparisonOperator(orderBy, index);

    query.where(
      orderByEntry.columnName,
      comparisonOperator,
      orderValues[index],
    );
  });

  return query;
}

function getComparisonOperator(
  orderBy: OrderBy,
  entryIndex: NonNegativeInteger,
): ComparisonOperator {
  if (orderBy.length - 1 > entryIndex) {
    return ComparisonOperator.Equal;
  }

  if (orderBy[entryIndex].direction === OrderByDirection.ASC) {
    return ComparisonOperator.GreatherThan;
  }

  return ComparisonOperator.LessThan;
}

function getCursorData(paginationArgs: PaginationArgs): CursorData | null {
  const cursor = isForwardPaginationArgs(paginationArgs)
    ? paginationArgs.after
    : paginationArgs.before;

  if (!cursor) {
    return null;
  }

  const cursorData = decodeCursor(cursor);

  return cursorData;
}

function separateArray<TType>(
  array: ReadonlyArray<TType>,
): ReadonlyArray<ReadonlyArray<TType>> {
  const separatedArray = array.map((entry, index) => array.slice(0, index + 1));

  return separatedArray;
}

function addOrderByClausesForPagination(
  query: QueryBuilder,
  orderBy: OrderBy,
): QueryBuilder {
  orderBy.forEach(orderByEntry => {
    query.orderBy(orderByEntry.columnName, orderByEntry.direction);
  });

  return query;
}

function sortRows(
  rows: ReadonlyArray<any>,
  paginationArgs: PaginationArgs,
): ReadonlyArray<any> {
  let sortedRows: ReadonlyArray<any>;

  if (isBackwardPaginationArgs(paginationArgs)) {
    sortedRows = reverse(rows);
  } else {
    sortedRows = rows;
  }

  return sortedRows;
}

type MakeEdgesArgs<TNode> = Readonly<{
  rows: ReadonlyArray<any>;
  orderBy: OrderBy;
  paginationArgs: PaginationArgs;
  limit: NonNegativeInteger;
  edgeFields: ReadonlyArray<string>;
  transformEdge?: TransformEdge<TNode>;
}>;

function makeEdges<TNode>(
  args: MakeEdgesArgs<TNode>,
): ReadonlyArray<Edge<TNode>> {
  const trimmedRows = trimRows(args.rows, args.paginationArgs, args.limit);

  const edges: ReadonlyArray<Edge<TNode>> = trimmedRows.map(row => {
    const edgeData = pick(args.edgeFields, row);
    const node = omit(args.edgeFields, row) as TNode;
    const cursor = makeCursor(node, args.orderBy);

    let edge: Edge<TNode> = {
      cursor,
      node,
      ...edgeData,
    };

    if (args.transformEdge) {
      edge = args.transformEdge(edge);
    }

    return edge;
  });

  return edges;
}

function trimRows(
  rows: ReadonlyArray<any>,
  paginationArgs: PaginationArgs,
  limit: NonNegativeInteger,
): ReadonlyArray<any> {
  let trimmedRows: ReadonlyArray<any>;

  if (rows.length < limit) {
    trimmedRows = rows;
  } else if (isForwardPaginationArgs(paginationArgs)) {
    trimmedRows = dropLast(1, rows);
  } else {
    trimmedRows = drop(1, rows);
  }

  return trimmedRows;
}

function makeCursor<TNode extends any>(node: TNode, orderBy: OrderBy): Cursor {
  const order = orderBy.map(({ columnName }) => {
    const splitColumnName = columnName.split('.');
    const key = splitColumnName[splitColumnName.length - 1];

    return node[key];
  });

  const cursorData: CursorData = { order };

  const cursor = encodeCursor(cursorData);

  return cursor;
}

type MakePageInfoArgs = Readonly<{
  paginationArgs: PaginationArgs;
  rows: ReadonlyArray<any>;
  edges: ReadonlyArray<Edge<any>>;
  limit: NonNegativeInteger;
}>;

function makePageInfo(args: MakePageInfoArgs): PageInfo {
  const startCursor = getStartCursor(args.edges);
  const endCursor = getEndCursor(args.edges);

  const hasNextPage =
    isForwardPaginationArgs(args.paginationArgs) &&
    areThereMoreRows(args.rows, args.limit);

  const hasPreviousPage =
    isBackwardPaginationArgs(args.paginationArgs) &&
    areThereMoreRows(args.rows, args.limit);

  const pageInfo: PageInfo = {
    startCursor,
    endCursor,
    hasNextPage,
    hasPreviousPage,
  };

  return pageInfo;
}

function getStartCursor(edges: ReadonlyArray<Edge<any>>): Cursor | null {
  if (edges.length === 0) {
    return null;
  }

  return edges[0].cursor;
}

function getEndCursor(edges: ReadonlyArray<Edge<any>>): Cursor | null {
  if (edges.length === 0) {
    return null;
  }

  return edges[edges.length - 1].cursor;
}

function areThereMoreRows(
  rows: ReadonlyArray<any>,
  limit: NonNegativeInteger,
): boolean {
  return rows.length === limit;
}

async function getTotalCount(
  query: QueryBuilder,
  options: DBOptions = {},
): Promise<NonNegativeInteger> {
  query.clearSelect().count();

  maybeAddTransactionToQuery(query, options);

  const [{ count: totalCount }] = await query;

  return totalCount;
}
