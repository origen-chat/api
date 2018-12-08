import { sendMail } from '../emails';
import { jobQueues } from '../jobQueues';
import { User } from '../users';
import { JobProcessor } from './types';

export type ProcessPostUserRegistrationJobData = Readonly<{
  user: User;
}>;

export const processPostUserRegistrationJob: JobProcessor<
  ProcessPostUserRegistrationJobData
> = async job => {
  const { user } = job.data;

  await sendWelcomeEmail(user);
};

async function sendWelcomeEmail(user: User): Promise<void> {
  await sendMail({});
}

export function startListeningOnPostUserRegistrationQueue(): void {
  jobQueues.postUserRegistration.process(processPostUserRegistrationJob);
}
