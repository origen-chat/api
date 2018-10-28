import { createLogger, format, transports } from 'winston';

import { env } from '../../config';

export type LogLevel = 'info' | 'warn' | 'error';

export const logger = createLogger({
  level: env.logLevel,
  format: format.combine(format.colorize(), format.simple()),
  transports: [new transports.Console()],
});

export default logger;
