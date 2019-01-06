import { insertIntoDB } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';
import { colorThemesTableName } from './constants';
import { Colors, ColorTheme } from './types';

export type CreateColorThemeArgs = InsertColorThemeIntoDBArgs;

export async function createColorTheme(
  args: CreateColorThemeArgs,
  options: DBOptions = {},
): Promise<ColorTheme> {
  const colorTheme = await insertColorThemeIntoDB(args, options);

  return colorTheme;
}

type InsertColorThemeIntoDBArgs = Readonly<{ author: User; colors: Colors }> &
  Pick<ColorTheme, 'name'>;

async function insertColorThemeIntoDB(
  args: InsertColorThemeIntoDBArgs,
  options: DBOptions = {},
): Promise<ColorTheme> {
  const doInsertColorThemeIntoDBArgs = makeDoInsertColorThemeIntoDBArgs(args);

  const colorTheme = await doInsertColorThemeIntoDB(
    doInsertColorThemeIntoDBArgs,
    options,
  );

  return colorTheme;
}

function makeDoInsertColorThemeIntoDBArgs(
  args: InsertColorThemeIntoDBArgs,
): DoInsertColorThemeIntoDBArgs {
  const doInsertColorThemeArgs: DoInsertColorThemeIntoDBArgs = {
    name: args.name,
    authorId: args.author.id,
    colors: args.colors,
  };

  return doInsertColorThemeArgs;
}

type DoInsertColorThemeIntoDBArgs = Pick<
  ColorTheme,
  'name' | 'authorId' | 'colors'
>;

async function doInsertColorThemeIntoDB(
  args: DoInsertColorThemeIntoDBArgs,
  options: DBOptions = {},
): Promise<ColorTheme> {
  const colorTheme = await insertIntoDB(
    {
      data: args,
      tableName: colorThemesTableName,
    },
    options,
  );

  return colorTheme;
}
