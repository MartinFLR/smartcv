import { TestBed } from '@angular/core/testing';
import { IaApiService } from './ia-api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { jest } from '@jest/globals';
import { CvPayload, CvResponse, TransformedCvResponse } from '@smartcv/types';
import { MOCK_CV_RESPONSE } from '../../../../../shared/testing/mocks/cv-response.mock';
import { firstValueFrom } from 'rxjs';
import { MOCK_CV_FORM } from '../../../../../shared/testing/mocks/cv.form.mock';
describe('IaApiService', () => {
  let service: IaApiService;
  let httpMock: HttpTestingController;
  const API_URL = '/api/generate-cv';
  const MOCK_PAYLOAD: CvPayload = {
    baseCv: MOCK_CV_FORM as any,
    jobDesc: 'Angular Lead',
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IaApiService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(IaApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  // ----------------------------------------------------------------------------------------------------
  describe('generateCvWithIA (HTTP & Transformation)', () => {
    it('should send POST request with payload', () => {
      service.generateCvWithIA(MOCK_PAYLOAD).subscribe();
      const req = httpMock.expectOne(API_URL);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(MOCK_PAYLOAD);
      // Finalizamos la petición para limpieza
      req.flush(MOCK_CV_RESPONSE);
    });
    it('should transform API response (string[] to string) for form compatibility', async () => {
      // Arrange: Simulamos una respuesta API (CvResponse) con arrays de bullets
      const apiResponse: CvResponse = {
        ...MOCK_CV_RESPONSE,
        // Usamos solo un elemento simple para simplificar la aserción
        experience: [
          {
            role: 'Dev',
            company: 'TestCo',
            bullets: ['Task 1', 'Task 2', 'Task 3'], // Array de strings
          },
        ] as any,
        projects: [
          {
            name: 'Project X',
            bullets: ['Feat A', 'Feat B'],
            subtitle: 'Sub',
          },
        ] as any,
      };
      // Act: Obtenemos la promesa del observable
      const promise = firstValueFrom(service.generateCvWithIA(MOCK_PAYLOAD));
      // Capturamos y respondemos
      const req = httpMock.expectOne(API_URL);
      req.flush(apiResponse);
      const transformedResponse = await promise;
      // Assert Transformación de experiencia
      expect(transformedResponse.experience[0].bullets).toBe('Task 1\nTask 2\nTask 3');
      expect(transformedResponse.experience[0].role).toBe('Dev'); // Verifica mapeo de otras claves
      // Assert Transformación de proyecto
      expect(transformedResponse.project[0].bullets).toBe('Feat A\nFeat B');
    });
    it('should handle null/missing arrays safely', async () => {
      // Arrange: Simulamos una respuesta con arrays vacíos o nulos
      const partialResponse: CvResponse = {
        ...MOCK_CV_RESPONSE,
        experience: undefined, // Simula undefined
        projects: [{ name: 'Project A', bullets: null as any, subtitle: '' }], // Simula bullets nulos
        education: [], // Simula array vacío
      };
      // Act
      const promise = firstValueFrom(service.generateCvWithIA(MOCK_PAYLOAD));
      const req = httpMock.expectOne(API_URL);
      req.flush(partialResponse);
      const transformedResponse = await promise;
      // Assert
      // 1. Array undefined -> debe ser un array vacío
      expect(transformedResponse.experience).toEqual([]);
      // 2. Array vacío -> debe ser un array vacío
      expect(transformedResponse.education).toEqual([]);
      // 3. Bullets nulos/no arrays -> deben ser strings vacíos
      expect(transformedResponse.project[0].bullets).toBe('');
    });
  });
});
