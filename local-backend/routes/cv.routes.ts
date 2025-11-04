import { Router } from 'express';
import {generateCoverLetterController, generateCvController} from '../controllers/cv.controller';
import {generateCoverLetter} from '../services/cv.service';

const router = Router();
router.post('/generate-cv', generateCvController);
router.post('/generate-cover-letter',generateCoverLetterController);
export default router;
