import { TestBed } from '@angular/core/testing';
import { HomeStateService } from './home-state.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';
import { CvFormBuilderService } from '../cv-form/cv-form-builder/cv-form-builder.service';
import { SaveDataService } from '../../../../core/services/save-data/save-data.service';
import { CvFormManagerService } from '../cv-form/cv-form-manager/cv-form-manager-service';
import { CvFormDataService } from '../cv-form/cv-form-data/cv-form-data.service';
import { jest } from '@jest/globals';
import { of, throwError, firstValueFrom } from 'rxjs';
import { MOCK_CV_RESPONSE } from '../../../../shared/testing/mocks/cv-response.mock';
import { signal, WritableSignal } from '@angular/core';

describe('HomeStateService', () => {
  let service: HomeStateService;
  let activeCvSignal: WritableSignal<any>;

  const mockCertsArray = new FormArray([new FormGroup({ name: new FormControl('CertA') })]);

  const mockCvForm = new FormGroup({
    personalInfo: new FormGroup({ name: new FormControl('Test'), job: new FormControl('Dev') }),
    experience: new FormArray([new FormGroup({ role: new FormControl('Exp') })]),
    education: new FormArray([]),
    projects: new FormArray([]),
    skills: new FormArray([
      new FormGroup({ certifications: mockCertsArray, skills: new FormControl(['TS']) }),
    ]),
  }) as any;
  const mockIaForm = new FormGroup({
    jobDescription: new FormControl('JD'),
    exaggeration: new FormControl(0),
  });

  const formManagerMock = {
    buildCvForm: jest.fn().mockReturnValue(mockCvForm),
    buildIaForm: jest.fn().mockReturnValue(mockIaForm),
    ensureMinimumFormArrays: jest.fn(),
    patchCvData: jest.fn(),
    resetCvForm: jest.fn(),
    patchFormArrays: jest.fn(),
  };

  const providers = [
    HomeStateService,
    { provide: CvFormManagerService, useValue: formManagerMock },
    {
      provide: CvFormDataService,
      useValue: {
        optimizarCv: jest.fn().mockReturnValue(of(MOCK_CV_RESPONSE)),
        downloadPdf: jest.fn(),
        saveCv: jest.fn(),
        clearCv: jest.fn(),
      },
    },
    { provide: TuiAlertService, useValue: { open: jest.fn().mockReturnValue(of(true)) } },
    {
      provide: CvFormBuilderService,
      useValue: {
        createExperienceGroup: jest.fn().mockReturnValue(new FormGroup({})),
        createEducationGroup: jest.fn().mockReturnValue(new FormGroup({})),
        createCertificationGroup: jest.fn().mockReturnValue(new FormGroup({})),
      },
    },
  ];

  const setupTestBed = (initialCv: any) => {
    // 1. Inicializamos la señal que se va a usar en el provider
    const signalInstance = signal(null);

    // 2. Clear y Setup
    jest.clearAllMocks();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        ...providers,
        // Usamos una nueva instancia de SaveDataService con la señal
        { provide: SaveDataService, useValue: { activeCv: signalInstance.asReadonly() } },
      ],
    });

    // 3. Inyectamos el servicio
    const newService = TestBed.inject(HomeStateService);

    // 4. CRÍTICO: Forzamos el estado que el test necesita después de la inyección
    if (initialCv) {
      signalInstance.set(initialCv);
    }

    return { service: newService, signal: signalInstance };
  };

  beforeEach(() => {
    const { service: s } = setupTestBed(null);
    service = s;
  });

  it('should be created and initialize forms via manager', () => {
    expect(service).toBeTruthy();
    expect(formManagerMock.buildCvForm).toHaveBeenCalled();
  });

  // ----------------------------------------------------------------------------------------------------

  describe('Optimización (optimizarCv)', () => {
    it('should call dataService and handle success (CV Unlocked)', async () => {
      const response = MOCK_CV_RESPONSE;
      const cvFormDataService = TestBed.inject(CvFormDataService);

      cvFormDataService.optimizarCv = jest.fn().mockReturnValue(of(response));
      service.iaForm.controls.jobDescription.setValue('Test JD');

      service.optimizarCv();

      // CRÍTICO: firstValueFrom está definido en el import de RxJS
      await firstValueFrom(of(true));

      expect(formManagerMock.patchFormArrays).toHaveBeenCalled();
      expect(cvFormDataService.saveCv).toHaveBeenCalled();
    });
  });

  // ----------------------------------------------------------------------------------------------------

  describe('Form Manipulation Methods', () => {
    it('should call builder and push new form group to FormArray', () => {
      const initialLength = service.experienceForms().length;
      service.addExperience();
      expect(service.cvFormBuilder.createExperienceGroup).toHaveBeenCalled();
      expect(service.experienceForms().length).toBe(initialLength + 1);
    });

    it('should remove form group from FormArray', () => {
      const initialLength = service.experienceForms().length;
      service.removeExperience(0);
      expect(service.experienceForms().length).toBe(initialLength - 1);
    });
  });
});
