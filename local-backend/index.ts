import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import cvRoutes from './routes/cv.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', cvRoutes);

app.listen(config.port, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${config.port}`);
});
