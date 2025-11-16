import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import moduleRoutes from '../modules';
import { logger } from '../core/logger';

export function createApp() {
  const app = express();

  app.use(
    cors({
      exposedHeaders: ['X-Ai-Provider', 'X-Ai-Model'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Ai-Provider', 'X-Ai-Model'],
    }),
  );

  app.use(express.json());

  app.use('/api', moduleRoutes);

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  };

  /* eslint-enable @typescript-eslint/no-unused-vars */
  app.use(errorHandler);

  return app;
}
