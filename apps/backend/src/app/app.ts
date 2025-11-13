import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import cvRoutes from '../modules/cv/cv.routes';
import { logger } from '../core/logger';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api', cvRoutes);

  const errorHandler: ErrorRequestHandler = (err, _req, res) => {
    logger.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  };

  app.use(errorHandler);

  return app;
}
