import { jobQueues } from '../jobQueues';
import { User } from '../users';

export async function enqueuePostRegisterUserJob(user: User): Promise<void> {
  await jobQueues.postRegisterUser.add({ user });
}
