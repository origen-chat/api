import { User } from '../users';
import { getUserConnectionCount } from './get';

export async function isUserConnected(user: User): Promise<boolean> {
  const connectionCount = await getUserConnectionCount(user);

  return connectionCount > 0;
}
