import { Router } from 'express';
import {
  analyzeCvAtsController,
  generateCoverLetterController,
  generateCvController
} from '../controllers/cv.controller';

const router = Router();
router.post('/generate-cv', generateCvController);
router.post('/generate-cover-letter',generateCoverLetterController);
router.post('/ats', analyzeCvAtsController);
export default router;
