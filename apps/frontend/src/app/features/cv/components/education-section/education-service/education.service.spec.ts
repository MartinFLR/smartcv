import { TestBed } from '@angular/core/testing';
import { EducationService } from './education.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { CvFormBuilderService } from '../../../services/cv-form/cv-form-builder/cv-form-builder.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { jest } from '@jest/globals';

describe('EducationService', () => {
  let service: EducationService;
  let cvStateServiceMock: any;
  let cvFormBuilderServiceMock: any;
  let educationArray: FormArray;

  beforeEach(() => {
    educationArray = new FormArray<any>([]);

    cvStateServiceMock = {
      educationArray: educationArray,
    };

    cvFormBuilderServiceMock = {
      createEducationGroup: jest.fn().mockReturnValue(
        new FormGroup({
          institution: new FormControl(''),
          title: new FormControl(''),
          dateIn: new FormControl(''),
          dateFin: new FormControl(''),
          bullets: new FormControl(''),
        }),
      ),
    };

    TestBed.configureTestingModule({
      providers: [
        EducationService,
        { provide: CvStateService, useValue: cvStateServiceMock },
        { provide: CvFormBuilderService, useValue: cvFormBuilderServiceMock },
      ],
    });
    service = TestBed.inject(EducationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return formArray from state', () => {
    expect(service.formArray()).toBe(educationArray);
  });

  describe('add', () => {
    it('should add a new education group to the form array', () => {
      expect(educationArray.length).toBe(0);

      service.add();

      expect(educationArray.length).toBe(1);
      expect(cvFormBuilderServiceMock.createEducationGroup).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove education group at index', () => {
      // Arrange
      educationArray.push(new FormGroup({}));
      educationArray.push(new FormGroup({}));
      expect(educationArray.length).toBe(2);

      // Act
      service.remove(0);

      // Assert
      expect(educationArray.length).toBe(1);
    });
  });
});
