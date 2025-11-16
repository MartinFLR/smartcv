import { Router } from 'express';
import { generateCvController } from './cv.controller';

const router = Router();

router.post('/generate-cv', generateCvController);

export default router;
