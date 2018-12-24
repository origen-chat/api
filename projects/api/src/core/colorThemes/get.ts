import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions, ID } from '../types';
import { colorThemesTableName } from './constants';
import { ColorTheme } from './types';

export async function getColorThemeById(
  id: ID,
  options: DBOptions = {},
): Promise<ColorTheme | null> {
  const colorTheme = await getColorThemeByFromDB({ id }, options);

  return colorTheme;
}

export type GetColorThemeByFromDBArgs =
  | Pick<ColorTheme, 'id'> & Readonly<{ name?: undefined }>
  | Pick<ColorTheme, 'name'> & Readonly<{ id?: undefined }>;

async function getColorThemeByFromDB(
  args: GetColorThemeByFromDBArgs,
  options: DBOptions = {},
): Promise<ColorTheme | null> {
  const query = db
    .select(`${colorThemesTableName}.*`)
    .from(colorThemesTableName)
    .first();

  if (args.id) {
    query.where(`${colorThemesTableName}.id`, args.id);
  } else if (args.name) {
    query.where(`${colorThemesTableName}.name`, args.name);
  }

  maybeAddTransactionToQuery(query, options);

  const colorTheme: ColorTheme | null = await query;

  return colorTheme;
}

export async function getColorThemeByName(
  name: string,
  options: DBOptions = {},
): Promise<ColorTheme | null> {
  const colorTheme = await getColorThemeByFromDB({ name }, options);

  return colorTheme;
}

export async function getColorThemesByIds(
  ids: ReadonlyArray<ID>,
  options: DBOptions = {},
): Promise<ReadonlyArray<ColorTheme>> {
  const colorThemes = await getColorThemesByFromDB({ ids }, options);

  return colorThemes;
}

export type GetColorThemesByFromDBArgs = Readonly<
  | { ids: ReadonlyArray<ID>; names?: undefined }
  | { names: ReadonlyArray<string>; ids?: undefined }
>;

async function getColorThemesByFromDB(
  args: GetColorThemesByFromDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<ColorTheme>> {
  const query = db
    .select(`${colorThemesTableName}.*`)
    .from(colorThemesTableName);

  if (args.ids) {
    query.whereIn('id', args.ids as any);
  } else if (args.names) {
    query.whereIn('name', args.names as any);
  }

  maybeAddTransactionToQuery(query, options);

  const colorThemes: ReadonlyArray<ColorTheme> = await query;

  return colorThemes;
}

export async function getColorThemesByNames(
  names: ReadonlyArray<string>,
  options: DBOptions = {},
): Promise<ReadonlyArray<ColorTheme>> {
  const colorThemes = await getColorThemesByFromDB({ names }, options);

  return colorThemes;
}
