import { QueryBuilder } from 'knex';
import { Connection } from '../types';

export async function makeConnectionFromQuery<TNode>(
  query: QueryBuilder,
): Promise<Connection<TNode>> {}
