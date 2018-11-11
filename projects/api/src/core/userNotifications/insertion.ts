import db, { maybeAddTransactionToQuery } from '../db';
import { Notification } from '../notifications';
import { DBOptions, Nullable } from '../types';
import { User } from '../users';
import { userNotificationsTableName } from './constants';
import { UserNotification } from './types';

export type InsertUserNotificationArgs = Readonly<{
  user: User;
  notification: Notification;
}>;

export async function insertUserNotification(
  args: InsertUserNotificationArgs,
  options: DBOptions = {},
): Promise<Nullable<UserNotification>> {
  const [userNotification] = await insertUserNotifications(
    { users: [args.user], notification: args.notification },
    options,
  );

  return userNotification;
}

export type InsertUserNotificationsArgs = Readonly<{
  users: ReadonlyArray<User>;
  notification: Notification;
}>;

export async function insertUserNotifications(
  args: InsertUserNotificationsArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserNotification>> {
  const doInsertUserNotificationsArgs = makeDoInsertUserNotificationsArgs(args);

  const userNotifications = await doInsertUserNotifications(
    doInsertUserNotificationsArgs,
    options,
  );

  return userNotifications;
}

function makeDoInsertUserNotificationsArgs(
  args: InsertUserNotificationsArgs,
): DoInsertUserNotificationsArgs {
  const data = args.users.map(user => ({
    userId: user.id,
    notificationId: args.notification.id,
  }));

  const doInsertUserNotificationsArgs: DoInsertUserNotificationsArgs = {
    data,
  };

  return doInsertUserNotificationsArgs;
}

type DoInsertUserNotificationsArgs = Readonly<{
  data: ReadonlyArray<Pick<UserNotification, 'userId' | 'notificationId'>>;
}>;

async function doInsertUserNotifications(
  args: DoInsertUserNotificationsArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserNotification>> {
  const query = db
    .insert(args.data)
    .into(userNotificationsTableName)
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const userNotifications = await query;

  return userNotifications;
}
