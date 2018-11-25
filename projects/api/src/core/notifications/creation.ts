import { doInTransaction, insertIntoDB } from '../db';
import { DBOptions } from '../types';
import { createUserNotifications } from '../userNotifications';
import { User } from '../users';
import { notificationsTableName } from './constants';
import { Notification } from './types';

export type CreateNotificationArgs = Readonly<{
  users: ReadonlyArray<User>;
}> &
  Pick<Notification, 'action' | 'data'>;

export async function createNotification(
  args: CreateNotificationArgs,
  options: DBOptions = {},
): Promise<Notification> {
  const insertedNotification = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { transaction };

    const notification = await insertNotificationIntoDB(
      args,
      optionsWithTransaction,
    );

    await createUserNotifications(
      { users: args.users, notification },
      optionsWithTransaction,
    );

    return notification;
  }, options);

  return insertedNotification;
}

export type InsertNotificationIntoDBArgs = DoInsertNotificationIntoDBArgs;

export async function insertNotificationIntoDB(
  args: InsertNotificationIntoDBArgs,
  options: DBOptions = {},
): Promise<Notification> {
  const notification = await doInsertNotificationIntoDB(args, options);

  return notification;
}

export type DoInsertNotificationIntoDBArgs = Pick<
  Notification,
  'action' | 'data'
>;

export async function doInsertNotificationIntoDB(
  args: DoInsertNotificationIntoDBArgs,
  options: DBOptions = {},
): Promise<Notification> {
  const notification = await insertIntoDB(
    {
      data: args,
      tableName: notificationsTableName,
    },
    options,
  );

  return notification;
}
