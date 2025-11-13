import pino from 'pino';
import { config } from '../../config/env';

const isDev = config.nodeEnv === 'development';

export const logger = pino({
  transport: isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
  level: isDev ? 'debug' : 'info',
});
