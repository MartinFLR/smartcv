import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ATSSection } from './ats-section';
import { AtsSectionService } from '../../services/ats-service/ats-section.service';
import { TuiAlertService } from '@taiga-ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { jest } from '@jest/globals';
import { TuiLanguageSwitcherService } from '@taiga-ui/i18n/utils';
import { CvAtsResponse } from '@smartcv/types';
import { MOCK_CV_ATS_RESPONSE } from '../../../../shared/testing/mocks/ats.mock';

describe('ATSSection', () => {
  let component: ATSSection;
  let fixture: ComponentFixture<ATSSection>;

  let responseSignal: any;
  let isLoadingSignal: any;
  let atsSectionServiceMock: any;
  let alertServiceMock: any;
  let languageSwitcherMock: any;
  let mockIaForm: FormGroup;

  beforeEach(async () => {
    responseSignal = signal<CvAtsResponse | null>(null);
    isLoadingSignal = signal(false);

    atsSectionServiceMock = {
      response: responseSignal,
      isLoading: isLoadingSignal,
      getAtsScore: jest.fn(),
    };

    alertServiceMock = {
      open: jest.fn().mockReturnValue(of(true)),
    };

    languageSwitcherMock = {
      language: 'spanish',
    };

    mockIaForm = new FormGroup({
      jobDescription: new FormControl('Software Engineer needed...'),
      exaggeration: new FormControl(0),
    });

    await TestBed.configureTestingModule({
      imports: [ATSSection],
      providers: [
        provideAnimations(),
        { provide: AtsSectionService, useValue: atsSectionServiceMock },
        { provide: TuiAlertService, useValue: alertServiceMock },
        { provide: TuiLanguageSwitcherService, useValue: languageSwitcherMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ATSSection);
    component = fixture.componentInstance;

    // Seteamos el input requerido (Signal Input)
    fixture.componentRef.setInput('iaForm', mockIaForm);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('File Processing (processFile)', () => {
    it('should accept valid PDF files', fakeAsync(() => {
      const file = new File(['dummy content'], 'cv.pdf', { type: 'application/pdf' });

      // Simulamos la selección del archivo a través del control
      component['control'].setValue(file);

      // processFile usa queueMicrotask, necesitamos esperar
      tick();

      expect(component['cvFile']()).toBe(file); // Signal actualizado
    }));

    it('should reject non-PDF files', fakeAsync(() => {
      const file = new File(['dummy content'], 'image.png', { type: 'image/png' });

      component['control'].clearValidators();
      component['control'].updateValueAndValidity({ emitEvent: false });

      const failedSpy = jest.spyOn(component['failedFiles$'], 'next');

      component['control'].setValue(file);
      tick();

      expect(component['cvFile']()).toBeNull();

      expect(failedSpy).toHaveBeenCalledWith(file);
    }));

    it('should clear file when removeFile is called', () => {
      // Arrange
      const file = new File([''], 'cv.pdf', { type: 'application/pdf' });
      component['cvFile'].set(file);
      component['control'].setValue(file);

      // Act
      component['removeFile']();

      // Assert
      expect(component['cvFile']()).toBeNull();
      expect(component['control'].value).toBeNull();
    });
  });

  describe('Score Calculation (calculateAtsScore)', () => {
    it('should call service with correct FormData when file is present', () => {
      // Arrange
      const file = new File(['content'], 'my-cv.pdf', { type: 'application/pdf' });
      component['cvFile'].set(file);

      // Mockeamos la respuesta exitosa del servicio
      atsSectionServiceMock.getAtsScore.mockReturnValue(of(MOCK_CV_ATS_RESPONSE));

      // Act
      component.calculateAtsScore();

      // Assert
      expect(atsSectionServiceMock.getAtsScore).toHaveBeenCalled();

      // Verificar argumentos de la llamada (FormData es difícil de inspeccionar directamente,
      // pero podemos verificar que se llamó)
      const calledFormData = atsSectionServiceMock.getAtsScore.mock.calls[0][0] as FormData;
      expect(calledFormData.has('file')).toBeTruthy();
      expect(calledFormData.get('jobDesc')).toBe('Software Engineer needed...');
    });

    it('should show alert warning if no file is selected', () => {
      // Arrange
      component['cvFile'].set(null);

      // Act
      component.calculateAtsScore();

      // Assert
      expect(atsSectionServiceMock.getAtsScore).not.toHaveBeenCalled();

      // Verificamos que se llamó con los argumentos correctos
      expect(alertServiceMock.open).toHaveBeenCalledWith(
        expect.stringContaining('subí tu CV'), // String parcial del mensaje real
        expect.objectContaining({ appearance: 'warning' }),
      );
    });

    it('should handle API errors gracefully', () => {
      // Arrange
      const file = new File([''], 'cv.pdf', { type: 'application/pdf' });
      component['cvFile'].set(file);

      atsSectionServiceMock.getAtsScore.mockReturnValue(throwError(() => new Error('API Error')));

      // Act
      component.calculateAtsScore();

      // Assert
      expect(alertServiceMock.open).toHaveBeenCalledWith(
        expect.stringContaining('error al analizar'),
        expect.objectContaining({ appearance: 'error' }),
      );
    });
  });

  describe('Computed Signals (View Logic)', () => {
    it('should calculate score color correctly based on matchScore', () => {
      // Caso: Score nulo
      responseSignal.set(null);
      fixture.detectChanges();
      expect(component['scoreColor']()).toContain('support-08'); // Gris/Default

      // Caso: Score bajo (<50)
      responseSignal.set({ ...MOCK_CV_ATS_RESPONSE, matchScore: 30 });
      fixture.detectChanges();
      expect(component['scoreColor']()).toContain('negative');

      // Caso: Score medio (<80)
      responseSignal.set({ ...MOCK_CV_ATS_RESPONSE, matchScore: 75 });
      fixture.detectChanges();
      expect(component['scoreColor']()).toContain('warning');

      // Caso: Score alto (>=80)
      responseSignal.set({ ...MOCK_CV_ATS_RESPONSE, matchScore: 95 });
      fixture.detectChanges();
      expect(component['scoreColor']()).toContain('positive');
    });

    it('should process analyzed sections correctly', () => {
      // Arrange
      responseSignal.set(MOCK_CV_ATS_RESPONSE);
      fixture.detectChanges();

      // Act
      const sections = component['analyzedSections']();

      // Assert
      expect(sections.length).toBeGreaterThan(0);
      // Verificar que mapeó correctamente una sección (ej: skills)
      const skillsSection = sections.find((s) => s.name === 'skills');
      expect(skillsSection).toBeDefined();
      expect(skillsSection?.score).toBe(95); // Valor del MOCK_CV_ATS_RESPONSE
    });

    it('should return empty array if no response data', () => {
      responseSignal.set(null);
      fixture.detectChanges();
      expect(component['analyzedSections']()).toEqual([]);
    });
  });
});
