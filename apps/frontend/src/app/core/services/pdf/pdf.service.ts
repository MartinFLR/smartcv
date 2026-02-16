import { inject, Injectable } from '@angular/core';
import { CvForm } from '@smartcv/types';
import { HarvardPdfStrategy } from './strategies/harvard.strategy';
import { CreativePdfStrategy } from './strategies/creative.strategy';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private readonly harvardStrategy = inject(HarvardPdfStrategy);
  private readonly creativeStrategy = inject(CreativePdfStrategy);

  public downloadPdf(data: CvForm, template = 'harvard'): void {
    if (template === 'creative') {
      this.creativeStrategy.generatePdf(data);
    } else {
      this.harvardStrategy.generatePdf(data);
    }
  }
}
