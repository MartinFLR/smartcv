import { Router } from 'express';
import { generateCoverLetterController } from './cover-letter.controller';

const router = Router();

router.post('/generate-cover-letter', generateCoverLetterController);

export default router;
