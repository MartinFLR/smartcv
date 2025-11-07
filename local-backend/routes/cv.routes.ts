import { Router } from 'express';
import multer from 'multer';
import {
  generateCvController
} from '../controllers/cv.controller';
import {generateCoverLetterController} from '../controllers/cover-letter.controller';
import {analyzeCvAtsController} from '../controllers/ats.controller';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/generate-cv', generateCvController);
router.post('/generate-cover-letter',generateCoverLetterController);
router.post('/ats', upload.single('file'), analyzeCvAtsController);
export default router;
