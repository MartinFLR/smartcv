import { generateCoverLetterController } from './cover-letter.controller';
import router from '../cv/cv.routes';

router.post('/generate-cover-letter', generateCoverLetterController);
