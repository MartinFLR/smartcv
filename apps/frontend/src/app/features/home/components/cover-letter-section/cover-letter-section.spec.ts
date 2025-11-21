import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CoverLetterSection } from './cover-letter-section';
import { CoverLetterService } from '../../services/cover-letter-service/cover-letter.service';
import { CvFormBuilderService } from '../../services/cv-form/cv-form-builder/cv-form-builder.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of, Subject, throwError } from 'rxjs';
import { jest } from '@jest/globals';
import { CoverLetterControls } from '../../../../core/models/controls.model';
import { CoverLetterPayload } from '@smartcv/types';

const mockInputForm = new FormGroup({});

const mockCoverLetterForm = new FormGroup<CoverLetterControls>({
  recruiterName: new FormControl(''),
  companyName: new FormControl(''),
  referralName: new FormControl(''),
  tone: new FormControl(0),
  deliveryChannel: new FormControl(0),
});

const cvFormBuilderMock = {
  buildCoverLetterForm: jest.fn().mockReturnValue(mockCoverLetterForm),
};

const coverLetterServiceMock = {
  generateCoverLetterStream: jest.fn(),
};

describe('CoverLetterSection', () => {
  let component: CoverLetterSection;
  let fixture: ComponentFixture<CoverLetterSection>;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockCoverLetterForm.reset({ tone: 0, deliveryChannel: 0 });
    mockCoverLetterForm.enable();

    await TestBed.configureTestingModule({
      imports: [CoverLetterSection, ReactiveFormsModule],
      providers: [
        provideAnimations(),
        { provide: CvFormBuilderService, useValue: cvFormBuilderMock },
        { provide: CoverLetterService, useValue: coverLetterServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoverLetterSection);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('cvForm', new FormGroup({}) as any);
    fixture.componentRef.setInput(
      'iaForm',
      new FormGroup({ jobDescription: new FormControl('Job Desc') }) as any,
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(cvFormBuilderMock.buildCoverLetterForm).toHaveBeenCalled();
  });

  describe('Form Reactivity (Effects)', () => {
    it('should disable recruiterName when delivery channel is ApplicationForm (value 2)', fakeAsync(() => {
      const recruiterControl = component['coverLetterForm'].controls.recruiterName;
      recruiterControl.setValue('Recruiter Name');

      component['coverLetterForm'].controls.deliveryChannel.setValue(2);

      fixture.detectChanges();
      tick();

      // Assert
      expect(recruiterControl.disabled).toBe(true);
      expect(recruiterControl.value).toBe('');
    }));

    it('should enable recruiterName when delivery channel is NOT ApplicationForm', fakeAsync(() => {
      const recruiterControl = component['coverLetterForm'].controls.recruiterName;
      component['coverLetterForm'].controls.deliveryChannel.setValue(2); // Application Form
      fixture.detectChanges();
      tick();
      expect(recruiterControl.disabled).toBe(true);

      component['coverLetterForm'].controls.deliveryChannel.setValue(1);
      fixture.detectChanges();
      tick();

      expect(recruiterControl.disabled).toBe(false);
    }));

    it('should enable referralName ONLY when delivery channel is InternalReferral (value 3)', fakeAsync(() => {
      const referralControl = component['coverLetterForm'].controls.referralName;

      fixture.detectChanges();
      tick();
      expect(referralControl.disabled).toBe(true);

      component['coverLetterForm'].controls.deliveryChannel.setValue(3);
      fixture.detectChanges();
      tick();

      // Assert
      expect(referralControl.enabled).toBe(true);
    }));
  });

  describe('Generate Cover Letter', () => {
    it('should process stream successfully', () => {
      // Arrange
      const stream$ = of('Ho', 'la ', 'Mun', 'do');
      coverLetterServiceMock.generateCoverLetterStream.mockReturnValue(stream$);

      // Act
      component.generateCoverLetter();

      // Assert
      expect(coverLetterServiceMock.generateCoverLetterStream).toHaveBeenCalled();
      expect(component.generatedLetter()).toBe('Hola Mundo');
      expect(component.isLoading()).toBe(false);
    });

    it('should handle errors in stream', () => {
      const errorStream$ = throwError(() => new Error('Stream Error'));
      coverLetterServiceMock.generateCoverLetterStream.mockReturnValue(errorStream$);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      component.generateCoverLetter();

      expect(component.generatedLetter()).toBe('Error al generar la carta.');
      expect(component.isLoading()).toBe(false);

      consoleSpy.mockRestore();
    });

    it('should map Tone and DeliveryChannel correctly in payload', () => {
      coverLetterServiceMock.generateCoverLetterStream.mockReturnValue(of(''));

      mockCoverLetterForm.patchValue({
        tone: 1, // Entusiasta
        deliveryChannel: 3, // Referente Interno
      });

      component.generateCoverLetter();

      const calledPayload = coverLetterServiceMock.generateCoverLetterStream.mock
        .calls[0][0] as CoverLetterPayload;

      expect(calledPayload.promptOption?.tone).toBe('enthusiast');
      expect(calledPayload.promptOption?.deliveryChannel).toBe('internalReferral');
    });
  });
});
