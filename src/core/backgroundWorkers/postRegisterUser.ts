import { sendEmail } from '../emails';
import { jobQueues } from '../jobQueues';
import { User } from '../users';

import { JobProcessor } from './types';

export type ProcessPostRegisterUserJobData = Readonly<{
  user: User;
}>;

export const processPostRegisterUserJob: JobProcessor<
  ProcessPostRegisterUserJobData
> = async job => {
  const { user } = job.data;

  await sendWelcomeEmail(user);
};

async function sendWelcomeEmail(user: User): Promise<void> {
  await sendEmail({ to: user.email, html: 'welcome', subject: 'welcome' });
}

export function startListeningOnPostRegisterUserQueue(): void {
  jobQueues.postRegisterUser.process(processPostRegisterUserJob);
}
