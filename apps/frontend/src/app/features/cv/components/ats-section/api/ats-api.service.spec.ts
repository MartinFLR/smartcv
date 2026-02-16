import { TestBed } from '@angular/core/testing';
import { AtsApiService } from './ats-api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, HttpErrorResponse } from '@angular/common/http';
import { jest } from '@jest/globals';
import { CvAtsResponse } from '@smartcv/types';
import { firstValueFrom } from 'rxjs';
describe('AtsApiService', () => {
  let service: AtsApiService;
  let httpMock: HttpTestingController;
  const API_URL = 'http://localhost:3000/api/ats';
  const MOCK_FORMDATA = new FormData();
  const MOCK_RESPONSE: CvAtsResponse = {
    text: 'CV Analizado',
    matchScore: 90,
    fitLevel: 'High',
    matchedKeywords: ['Angular'],
    missingKeywords: ['React'],
    sections: {} as any,
    sectionScores: {} as any,
    recommendations: [],
    warnings: [],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtsApiService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AtsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  // ----------------------------------------------------------------------------------------------------
  describe('API Call and State Management', () => {
    it('should set isLoading=true and response=null on call start', () => {
      const sub = service.getAtsScore(MOCK_FORMDATA).subscribe();
      const req = httpMock.expectOne(API_URL);
      expect(service.isLoading()).toBe(true);
      expect(service.response()).toBeNull();
      req.flush(MOCK_RESPONSE);
      sub.unsubscribe();
    });
    it('should set response signal and isLoading=false on SUCCESS', () => {
      const sub = service.getAtsScore(MOCK_FORMDATA).subscribe({
        next: (res) => {
          expect(service.response()).toEqual(MOCK_RESPONSE);
        },
      });
      const req = httpMock.expectOne(API_URL);
      // Act: Disparamos la respuesta (Esto ejecuta el tap, luego finalize)
      req.flush(MOCK_RESPONSE);
      // Assert Estado Final: Ahora sí, finalize ya corrió
      expect(service.isLoading()).toBe(false);
      sub.unsubscribe();
    });
  });
  // ----------------------------------------------------------------------------------------------------
  describe('Error Handling', () => {
    beforeEach(() => {
      // Mockeamos console.error para evitar log innecesario durante tests de error
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    it('should reset response, set isLoading=false, and rethrow custom error on SERVER error (HttpError)', async () => {
      const serverError = new HttpErrorResponse({
        status: 500,
        statusText: 'Internal Server Error',
        error: 'Database Down',
        url: API_URL,
      });
      const promise = firstValueFrom(service.getAtsScore(MOCK_FORMDATA));
      const req = httpMock.expectOne(API_URL);
      req.error(new ErrorEvent('Server Down'), serverError);
      // Esperamos el rechazo de la promesa
      await expect(promise).rejects.toThrow(
        'Falló la conexión con el servicio de ATS. Por favor, intentá más tarde.',
      );
      // Assert Estado Final
      expect(service.isLoading()).toBe(false); // Finalize corrió
      expect(service.response()).toBeNull();
    });
    it('should rethrow custom error on CLIENT-SIDE error (Network/ErrorEvent)', async () => {
      const clientError = new ProgressEvent('error');
      const promise = firstValueFrom(service.getAtsScore(MOCK_FORMDATA));
      const req = httpMock.expectOne(API_URL);
      req.error(new ErrorEvent('Client Error'), clientError as any);
      await expect(promise).rejects.toThrow(
        'Falló la conexión con el servicio de ATS. Por favor, intentá más tarde.',
      );
      // Assert Estado Final
      expect(service.isLoading()).toBe(false);
    });
  });
});
