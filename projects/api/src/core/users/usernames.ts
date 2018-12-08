import db, { maybeAddTransactionToQuery } from '../db';
import { generateRandomInteger } from '../helpers';
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
  const query = db
    .from(usersTableName)
    .where({ username })
    .count()
    .first();

  maybeAddTransactionToQuery(query, options);

  const { count } = await query;

  return count;
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
    unusedUsernameIdentifier,
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

const adjectives = [
  'good',
  'sassy',
  'impartial',
  'guiltless',
  'charming',
  'loving',
  'happy',
  'amused',
  'classy',
  'fantastic',
  'sweet',
  'kindhearted',
  'grateful',
  'mindful',
  'brave',
  'productive',
  'awesome',
  'cheerful',
  'marvelous',
  'determined',
  'cooperative',
  'skillful',
  'resolute',
  'wholesome',
  'jolly',
  'truthful',
  'eager',
  'honorable',
  'observant',
  'conscious',
  'fabulous',
  'festive',
  'admirable',
  'unbreakable',
  'gifted',
  'polite',
  'capable',
  'fascinated',
  'glamorous',
  'keen',
  'sincere',
  'wonderful',
  'diligent',
  'warm',
  'functional',
  'groovy',
  'courageous',
  'knowing',
  'fancy',
  'caring',
  'talented',
  'calm',
  'learned',
  'efficient',
  'interested',
  'assertive',
  'successful',
  'careful',
  'friendly',
  'reasonable',
  'pleasant',
];

const animals = [
  'kitten',
  'snail',
  'walrus',
  'goat',
  'yak',
  'reindeer',
  'lion',
  'koala',
  'bunny',
  'yak',
  'moose',
  'iguana',
  'pony',
  'deer',
  'frog',
  'bear',
  'rhinoceros',
  'alpaca',
  'leopard',
  'zebra',
  'parakeet',
  'fawn',
  'llama',
  'panda',
  'bison',
  'flyingBison',
  'horse',
  'lamb',
  'rabbit',
  'owl',
  'bumbleBee',
  'husky',
  'ox',
  'polarBear',
  'canary',
  'gemsbok',
  'squirrel',
  'giraffe',
  'elk',
  'eland',
  'octopus',
  'gopher',
  'kangaroo',
  'chameleon',
  'armadillo',
  'cheetah',
  'zebu',
  'basilisk',
  'springbok',
  'aoudad',
  'addax',
  'ram',
  'crocodile',
  'ibex',
  'meerkat',
  'stallion',
  'waterbuck',
  'gazelle',
  'puppy',
  'alligator',
  'coati',
  'lovebird',
  'platypus',
  'argali',
  'buffalo',
  'hare',
  'hedgehog',
  'beaver',
  'swan',
  'unicorn',
  'turtle',
  'dolphin',
  'chowChow',
  'beetle',
];

export function generateRandomUsername(): string {
  const adjectiveIndex = generateRandomInteger(0, adjectives.length - 1);
  const adjective = adjectives[adjectiveIndex];

  const animalIndex = generateRandomInteger(0, animals.length - 1);
  const animal = capitalizeString(animals[animalIndex]);

  const randomUsername = `${adjective}${animal}`;

  return randomUsername;
}

function capitalizeString(string: string): string {
  if (string.length === 0) {
    return string;
  }

  return string[0].toUpperCase() + string.slice(1);
}
