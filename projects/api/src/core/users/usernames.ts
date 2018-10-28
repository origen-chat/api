import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import {
  maxUsernameCount,
  usernameIdentifierLength,
  usersTableName,
} from './constants';
import { UsernameIdentifier } from './types';

export async function getUnusedUsernameIdentifier(
  username: string,
  options: DBOptions = {},
): Promise<UsernameIdentifier> {
  await checkUsernameCount(username, options);

  const usernameIdentifier = await doGetUnusedUsernameIdentifier(
    username,
    options,
  );

  return usernameIdentifier;
}

async function checkUsernameCount(
  username: string,
  options: DBOptions = {},
): Promise<void> {
  const usernameCount = await getUsernameCount(username, options);

  if (usernameCount === maxUsernameCount) {
    throw new Error('too many users with the same username');
  }
}

async function getUsernameCount(
  username: string,
  options: DBOptions = {},
): Promise<number> {
  const { count } = await db
    .from(usersTableName)
    .where({ username })
    .count()
    .first();

  return Number.parseInt(count, 10);
}

async function doGetUnusedUsernameIdentifier(
  username: string,
  options: DBOptions = {},
): Promise<UsernameIdentifier> {
  const sqlQuery = `
    SELECT
      generate_series::varchar AS "unusedUsernameIdentifier"
    FROM generate_series(0, ?)
    LEFT JOIN
      (
        SELECT *
        FROM "users"
        WHERE "users"."username" = ?
      ) AS u
      ON u."usernameIdentifier"::int = generate_series
    WHERE u."usernameIdentifier" IS NULL
    ORDER BY random()
    LIMIT 1;
  `;

  const query = db.raw(sqlQuery, [maxUsernameCount, username]);

  maybeAddTransactionToQuery(query, options);

  const {
    rows: [{ unusedUsernameIdentifier }],
  } = await query;

  const paddedUnusedUsernameIdentifier = padUsernameIdentifier(
    unusedUsernameIdentifier as string,
  );

  return paddedUnusedUsernameIdentifier;
}

function padUsernameIdentifier(usernameIdentifier: string): string {
  const paddedUnusedUsernameIdentifier = usernameIdentifier.padStart(
    usernameIdentifierLength,
    '0',
  );

  return paddedUnusedUsernameIdentifier;
}
