import Mailgun from 'mailgun-js';

import * as config from '../../config';
import logger from '../logger';

export const mailgun = Mailgun({
  apiKey: config.env.mailgunApiKey,
  domain: config.env.mailgunDomain,
  // @ts-ignore
  testMode: !config.env.enableEmail,
  // @ts-ignore
  testModeLogger: () => {
    logger.debug('📧 email sent!');
  },
});
