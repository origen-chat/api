import { insertIntoDB } from '../db';
import { Notification } from '../notifications';
import { DBOptions } from '../types';
import { User } from '../users';
import { userNotificationsTableName } from './constants';
import { UserNotification } from './types';

export type CreateUserNotificationArgs = Readonly<{
  user: User;
  notification: Notification;
}>;

export async function createUserNotification(
  args: CreateUserNotificationArgs,
  options: DBOptions = {},
): Promise<UserNotification | null> {
  const [userNotification] = await createUserNotifications(
    { users: [args.user], notification: args.notification },
    options,
  );

  return userNotification;
}

export type CreateUserNotificationsArgs = InsertUserNotificationsIntoDBArgs;

export async function createUserNotifications(
  args: CreateUserNotificationsArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserNotification>> {
  const userNotifications = await insertUserNotificationsIntoDB(args, options);

  return userNotifications;
}

export type InsertUserNotificationsIntoDBArgs = Readonly<{
  users: ReadonlyArray<User>;
  notification: Notification;
}>;

export async function insertUserNotificationsIntoDB(
  args: InsertUserNotificationsIntoDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserNotification>> {
  const doInsertUserNotificationsIntoDBArgs = makeDoInsertUserNotificationsIntoDBArgs(
    args,
  );

  const userNotifications = await doInsertUserNotificationsIntoDB(
    doInsertUserNotificationsIntoDBArgs,
    options,
  );

  return userNotifications;
}

function makeDoInsertUserNotificationsIntoDBArgs(
  args: InsertUserNotificationsIntoDBArgs,
): DoInsertUserNotificationsIntoDBArgs {
  const data = args.users.map(user => ({
    userId: user.id,
    notificationId: args.notification.id,
  }));

  const doInsertUserNotificationsIntoDBArgs: DoInsertUserNotificationsIntoDBArgs = {
    data,
  };

  return doInsertUserNotificationsIntoDBArgs;
}

type DoInsertUserNotificationsIntoDBArgs = Readonly<{
  data: ReadonlyArray<Pick<UserNotification, 'userId' | 'notificationId'>>;
}>;

async function doInsertUserNotificationsIntoDB(
  args: DoInsertUserNotificationsIntoDBArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<UserNotification>> {
  const userNotifications = await insertIntoDB(
    { data: args.data, tableName: userNotificationsTableName },
    options,
  );

  return userNotifications;
}
