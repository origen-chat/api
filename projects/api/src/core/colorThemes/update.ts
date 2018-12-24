import db, { maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { colorThemesTableName } from './constants';
import { ColorTheme } from './types';

export type UpdateColorThemeArgs = UpdateColorThemeInDBArgs;

export async function updateColorTheme(
  colorTheme: ColorTheme,
  args: UpdateColorThemeArgs,
  options: DBOptions = {},
): Promise<ColorTheme> {
  const updatedColorTheme = await updateColorThemeInDB(
    colorTheme,
    args,
    options,
  );

  return updatedColorTheme;
}

export type UpdateColorThemeInDBArgs = DoUpdateColorThemeInDBArgs;

export async function updateColorThemeInDB(
  colorTheme: ColorTheme,
  args: UpdateColorThemeInDBArgs,
  options: DBOptions = {},
): Promise<ColorTheme> {
  const updatedColorTheme = await doUpdateColorThemeInDB(
    colorTheme,
    args,
    options,
  );

  return updatedColorTheme;
}

export type DoUpdateColorThemeInDBArgs = Partial<
  Pick<ColorTheme, 'name' | 'colors'>
>;

export async function doUpdateColorThemeInDB(
  colorTheme: ColorTheme,
  args: DoUpdateColorThemeInDBArgs,
  options: DBOptions = {},
): Promise<ColorTheme> {
  const data = {
    ...args,
    updatedAt: new Date().toISOString(),
  };

  const query = db(colorThemesTableName)
    .update(data)
    .where({ id: colorTheme.id })
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [updatedColorTheme] = await query;

  return updatedColorTheme;
}
