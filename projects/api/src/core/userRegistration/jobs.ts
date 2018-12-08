import { jobQueues } from '../jobQueues';
import { User } from '../users';

export async function enqueuePostUserRegistrationJob(
  user: User,
): Promise<void> {
  await jobQueues.postUserRegistration.add({ user });
}
