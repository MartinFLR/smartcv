import { Router } from 'express';
import multer from 'multer';
import { analyzeCvAtsController } from './ats.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/ats', upload.single('file'), analyzeCvAtsController);

export default router;
