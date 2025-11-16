import { Router } from 'express';

import cvRoutes from './cv/cv.routes';
import atsRoutes from './ats/ats.routes';
import coverLetterRoutes from './cover-letter/cover-letter.routes';

const router = Router();

router.use(cvRoutes);
router.use(atsRoutes);
router.use(coverLetterRoutes);

export default router;
