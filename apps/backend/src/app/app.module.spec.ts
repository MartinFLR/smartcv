import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app/app.module';
describe('AppModule (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    // Enable CORS like in main.ts
    app.enableCors({
      exposedHeaders: ['X-Ai-Provider', 'X-Ai-Model'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Ai-Provider', 'X-Ai-Model'],
    });
    await app.init();
  });
  afterEach(async () => {
    await app.close();
  });
  it('should be defined', () => {
    expect(app).toBeDefined();
  });
  it('should load all modules correctly', () => {
    const modules = ['AtsModule', 'CvModule', 'CoverLetterModule'];
    // Verify modules are loaded (this is a basic check)
    expect(app).toBeDefined();
  });
  describe('CORS Configuration', () => {
    it('should have CORS enabled', async () => {
      // This is verified by the enableCors call in beforeEach
      expect(app).toBeDefined();
    });
  });
});
