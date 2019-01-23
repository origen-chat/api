import { insertIntoDB } from '../db';
import { DBOptions } from '../types';
import { User } from '../users';

import { socialLoginsTableName } from './constants';
import { SocialLogin } from './types';

export type CreateSocialLoginArgs = InsertSocialLoginIntoDBArgs;

export async function createSocialLogin(
  args: CreateSocialLoginArgs,
  options: DBOptions = {},
): Promise<SocialLogin> {
  const socialLogin = await insertSocialLoginIntoDB(args, options);

  return socialLogin;
}

type InsertSocialLoginIntoDBArgs = Readonly<{ user: User }> &
  Pick<DoInsertSocialLoginIntoDBArgs, 'providerUserId' | 'provider'>;

async function insertSocialLoginIntoDB(
  args: InsertSocialLoginIntoDBArgs,
  options: DBOptions = {},
): Promise<SocialLogin> {
  const doInsertSocialLoginIntoDBArgs = makeDoInsertSocialLoginIntoDBArgs(args);

  const socialLogin = await doInsertSocialLoginIntoDB(
    doInsertSocialLoginIntoDBArgs,
    options,
  );

  return socialLogin;
}

function makeDoInsertSocialLoginIntoDBArgs(
  args: InsertSocialLoginIntoDBArgs,
): DoInsertSocialLoginIntoDBArgs {
  const doInsertSocialLoginIntoDBArgs: DoInsertSocialLoginIntoDBArgs = {
    userId: args.user.id,
    providerUserId: args.providerUserId,
    provider: args.provider,
  };

  return doInsertSocialLoginIntoDBArgs;
}

type DoInsertSocialLoginIntoDBArgs = Pick<
  SocialLogin,
  'userId' | 'providerUserId' | 'provider'
>;

async function doInsertSocialLoginIntoDB(
  args: DoInsertSocialLoginIntoDBArgs,
  options: DBOptions = {},
): Promise<SocialLogin> {
  const socialLogin = await insertIntoDB(
    { data: args, tableName: socialLoginsTableName },
    options,
  );

  return socialLogin;
}
