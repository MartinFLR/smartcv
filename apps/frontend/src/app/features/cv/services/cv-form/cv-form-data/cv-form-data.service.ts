import { inject, Injectable } from '@angular/core';
import { SaveDataService } from '../../../../../core/services/save-data/save-data.service';
import { PdfService } from '../../../../../core/services/pdf/pdf.service';
import { IaApiService } from '../../../components/ia-section/api/ia-api.service';
import {
  BuildPromptOptions,
  CvForm,
  CvPayload,
  TemperatureLevel,
  TransformedCvResponse,
} from '@smartcv/types';
import { Observable } from 'rxjs';
import { TuiLanguageSwitcherService } from '@taiga-ui/i18n/utils';

@Injectable({
  providedIn: 'root',
})
export class CvFormDataService {
  private readonly iaService = inject(IaApiService);
  private readonly pdfService = inject(PdfService);
  private readonly saveDataService = inject(SaveDataService);
  private readonly switcher = inject(TuiLanguageSwitcherService);

  //TODO: Refactor: This maybe can be in the ia-section.service
  public optimizeCv(
    baseCv: CvForm,
    jobDesc: string,
    exaggeration: number,
  ): Observable<TransformedCvResponse> {
    const temperature = this.detectTemperature(exaggeration);

    const promptOption = {
      lang: this.switcher.language,
      temperature,
      type: 'tailoredCv',
    } as BuildPromptOptions;

    const payload: CvPayload = {
      baseCv,
      jobDesc,
      promptOption,
    };
    return this.iaService.generateCvWithIA(payload);
  }

  public downloadPdf(data: CvForm): void {
    this.pdfService.downloadPdf(data);
  }

  public saveCv(data: CvForm): void {
    this.saveDataService.saveData(data);
  }

  public clearCv(): void {
    this.saveDataService.clearData();
  }

  private detectTemperature(num: number): TemperatureLevel {
    switch (num) {
      case 0:
        return 'low';
      case 1:
        return 'medium';
      case 2:
        return 'high';
      default:
        return 'low';
    }
  }
}
