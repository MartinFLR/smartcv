import { Router } from 'express';
import { generateCvController } from '../controllers/cv.controller';

const router = Router();
router.post('/generate-cv', generateCvController);
export default router;
