import { User } from '../users';
import { UserConnectionStatus } from './constants';
import { getUserConnectionStatus } from './get';

export async function isUserConnected(user: User): Promise<boolean> {
  const connectionStatus = await getUserConnectionStatus(user);

  return connectionStatus === UserConnectionStatus.Online;
}
