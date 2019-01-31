import { Workspace } from '../workspaces';
import { Channel, channelsTableName } from '../channels';
import { DBOptions, ComparisonOperator } from '../types';
import db, { maybeAddTransactionToQuery } from '../db';

import { messagesTableName } from './constants';
import { Message } from './types';

export type GetUpdatedMessagesArgs = Readonly<
  {
    since: Date;
  } & (
    | { workspace: Workspace; channel?: undefined }
    | { channel: Channel; workspace?: undefined })
>;

export async function getUpdatedMessages(
  args: GetUpdatedMessagesArgs,
  options: DBOptions = {},
): Promise<ReadonlyArray<Message>> {
  const query = db
    .select(`${messagesTableName}.*`)
    .from(messagesTableName)
    .where(
      `${messagesTableName}.updatedAt`,
      ComparisonOperator.GreatherThanOrEqual,
      args.since,
    );

  if (args.workspace) {
    query
      .innerJoin(
        channelsTableName,
        `${channelsTableName}.id`,
        `${messagesTableName}.channelId`,
      )
      .where(`${channelsTableName}.workspaceId`, args.workspace.id);
  } else if (args.channel) {
    query.where(`${messagesTableName}.channelId`, args.channel.id);
  }

  maybeAddTransactionToQuery(query, options);

  const updatedMessages = await query;

  return updatedMessages;
}
