import { Email, HTML } from '../types';

import { mailgun } from './mailgun';

export type SendEmailArgs = Readonly<{
  to: Email;
  from?: string;
  subject: string;
  html: HTML;
}>;

export async function sendEmail(args: SendEmailArgs): Promise<void> {
  await mailgun.messages().send({
    to: args.to,
    from: args.from,
    subject: args.subject,
    html: args.html,
  });
}
