import { CvForm } from '@smartcv/types';

export interface PdfGeneratorStrategy {
  generatePdf(data: CvForm): void;
}
