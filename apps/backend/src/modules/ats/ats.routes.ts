import { analyzeCvAtsController } from './ats.controller';
import { Router } from 'express';
import multer from 'multer';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/ats', upload.single('file'), analyzeCvAtsController);
