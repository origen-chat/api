import { createLogger, format, transports } from 'winston';

import { env } from '../../config';
import { isProductionEnvironment } from '../../helpers';

export type LogLevel = 'verbose' | 'info' | 'warn' | 'error';

let loggerFormatter: ReturnType<typeof format.combine>;

if (isProductionEnvironment) {
  loggerFormatter = format.combine(format.timestamp(), format.json());
} else {
  loggerFormatter = format.combine(format.colorize(), format.simple());
}

const loggerTransports = [new transports.Console()];

export const logger = createLogger({
  level: env.logLevel,
  format: loggerFormatter,
  transports: loggerTransports,
});

export default logger;
