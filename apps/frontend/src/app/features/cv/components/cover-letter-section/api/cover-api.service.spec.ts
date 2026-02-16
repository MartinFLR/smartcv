import { TestBed } from '@angular/core/testing';
import { CoverApiService } from './cover-api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, HttpEventType, HttpDownloadProgressEvent } from '@angular/common/http';
import { jest } from '@jest/globals';
import { CoverLetterPayload } from '@smartcv/types';
import { take, lastValueFrom } from 'rxjs';
import { MOCK_CV_FORM } from '../../../../../shared/testing/mocks/cv.form.mock';
describe('CoverApiService', () => {
  let service: CoverApiService;
  let httpMock: HttpTestingController;
  const MOCK_PAYLOAD: CoverLetterPayload = {
    baseCv: MOCK_CV_FORM as any,
    jobDesc: 'Job Description',
  };
  const API_URL = 'http://localhost:3000/api/generate-cover-letter';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoverApiService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CoverApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should construct the correct POST request with streaming headers', () => {
    // CRÍTICO: Debemos suscribirnos para ejecutar el servicio
    const subscription = service.generateCoverLetterStream(MOCK_PAYLOAD).subscribe();
    const req = httpMock.expectOne(API_URL);
    // Assert request configuration
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(MOCK_PAYLOAD);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.reportProgress).toBe(true);
    req.flush('OK');
    subscription.unsubscribe();
  });
  it('should process sequential chunks correctly and maintain internal state', (done) => {
    const expectedChunks = ['Chunk 1', 'Chunk 2', 'Chunk 3'];
    let receivedChunks: string[] = [];
    service.generateCoverLetterStream(MOCK_PAYLOAD).subscribe({
      next: (chunk) => {
        receivedChunks.push(chunk);
        expect(expectedChunks).toContain(chunk);
      },
      complete: () => {
        expect(receivedChunks).toEqual(expectedChunks);
        done();
      },
      error: done.fail,
    });
    const req = httpMock.expectOne(API_URL);
    req.event({ type: HttpEventType.DownloadProgress, loaded: 9, partialText: 'Chunk 1' });
    req.event({ type: HttpEventType.DownloadProgress, loaded: 18, partialText: 'Chunk 1Chunk 2' });
    req.event({
      type: HttpEventType.DownloadProgress,
      loaded: 27,
      partialText: 'Chunk 1Chunk 2Chunk 3',
    });
    req.flush('Final', { status: 200, statusText: 'OK' });
  });
  it('should filter out empty chunks from the stream', (done) => {
    const expectedChunks = ['Start', 'End'];
    let receivedChunks: string[] = [];
    service.generateCoverLetterStream(MOCK_PAYLOAD).subscribe({
      next: (chunk) => {
        receivedChunks.push(chunk);
      },
      complete: () => {
        expect(receivedChunks).toEqual(expectedChunks);
        done();
      },
      error: done.fail,
    });
    const req = httpMock.expectOne(API_URL);
    req.event({ type: HttpEventType.DownloadProgress, loaded: 5, partialText: 'Start' });
    req.event({ type: HttpEventType.DownloadProgress, loaded: 5, partialText: 'Start' });
    req.event({ type: HttpEventType.DownloadProgress, loaded: 9, partialText: 'StartEnd' });
    req.flush('Final');
  });
  it('should catch HttpClient error and rethrow custom error message', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const errorResponse = { status: 500, statusText: 'Server Error' };
    const promise = lastValueFrom(service.generateCoverLetterStream(MOCK_PAYLOAD));
    const req = httpMock.expectOne(API_URL);
    req.error(new ErrorEvent('API Error'), errorResponse);
    await expect(promise).rejects.toThrow('Error al generar la carta.');
  });
});
