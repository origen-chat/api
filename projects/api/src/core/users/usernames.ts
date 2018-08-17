import db from '../db';
import {
  maxUsernameCount,
  usernameIdentifierLength,
  usersTableName,
} from './constants';
import { UsernameIdentifier } from './types';

export async function getUnusedUsernameIdentifier(
  username: string,
): Promise<UsernameIdentifier> {
  checkUsernameCount(username);

  const usernameIdentifier = await doGetUnusedUsernameIdentifier(username);

  return usernameIdentifier;
}

async function checkUsernameCount(username: string): Promise<void> {
  const usernameCount = await getUsernameCount(username);

  if (usernameCount === maxUsernameCount) {
    throw new Error('too many users with the same username');
  }
}

async function getUsernameCount(username: string): Promise<number> {
  const { count } = await db
    .from(usersTableName)
    .where({ username })
    .count()
    .first();

  return parseInt(count, 10);
}

async function doGetUnusedUsernameIdentifier(
  username: string,
): Promise<UsernameIdentifier> {
  const query = `
    SELECT
      generate_series::varchar AS "unusedUsernameIdentifier"
    FROM generate_series(0, ?)
    LEFT JOIN
      (
        SELECT *
        FROM users
        WHERE users."username" = ?
      ) AS u
      ON u."usernameIdentifier"::int = generate_series
    WHERE u."usernameIdentifier" IS NULL
    ORDER BY random()
    LIMIT 1;
  `;

  const {
    rows: [{ unusedUsernameIdentifier }],
  } = await db.raw(query, [maxUsernameCount, username]);

  const paddedUnusedUsernameIdentifier = padUsernameIdentifier(
    unusedUsernameIdentifier as string,
  );

  return paddedUnusedUsernameIdentifier;
}

function padUsernameIdentifier(usernameIdentifier: number | string): string {
  const paddedUnusedUsernameIdentifier = usernameIdentifier
    .toString()
    .padStart(usernameIdentifierLength, '0');

  return paddedUnusedUsernameIdentifier;
}
