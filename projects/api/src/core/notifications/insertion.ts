import db, { doInTransaction, maybeAddTransactionToQuery } from '../db';
import { DBOptions } from '../types';
import { insertUserNotifications } from '../userNotifications';
import { User } from '../users';
import { notificationsTableName } from './constants';
import { Notification } from './types';

export type InsertNotificationArgs = Readonly<{
  users: ReadonlyArray<User>;
}> &
  Pick<Notification, 'action' | 'data'>;

/**
 * Inserts a notification.
 */
export async function insertNotification(
  args: InsertNotificationArgs,
  options: DBOptions = {},
): Promise<Notification> {
  const insertedNotification = await doInTransaction(async transaction => {
    const optionsWithTransaction: DBOptions = { transaction };

    const notification = await doInsertNotification(
      args,
      optionsWithTransaction,
    );

    await insertUserNotifications({ users: args.users, notification });

    return notification;
  }, options);

  return insertedNotification;
}

export async function doInsertNotification(
  args: InsertNotificationArgs,
  options: DBOptions = {},
): Promise<Notification> {
  const query = db
    .insert(args)
    .into(notificationsTableName)
    .returning('*');

  maybeAddTransactionToQuery(query, options);

  const [notification] = await query;

  return notification;
}
