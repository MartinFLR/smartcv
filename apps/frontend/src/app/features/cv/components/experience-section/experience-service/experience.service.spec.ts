import { TestBed } from '@angular/core/testing';
import { ExperienceService } from './experience.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { CvFormBuilderService } from '../../../services/cv-form/cv-form-builder/cv-form-builder.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { jest } from '@jest/globals';
describe('ExperienceService', () => {
  let service: ExperienceService;
  let cvStateServiceMock: any;
  let cvFormBuilderServiceMock: any;
  let experienceArray: FormArray;
  beforeEach(() => {
    experienceArray = new FormArray<any>([]);
    cvStateServiceMock = {
      experienceArray: experienceArray,
    };
    cvFormBuilderServiceMock = {
      createExperienceGroup: jest.fn().mockReturnValue(
        new FormGroup({
          role: new FormControl(''),
          company: new FormControl(''),
          dateIn: new FormControl(''),
          dateFin: new FormControl(''),
          bullets: new FormControl(''),
        }),
      ),
    };
    TestBed.configureTestingModule({
      providers: [
        ExperienceService,
        { provide: CvStateService, useValue: cvStateServiceMock },
        { provide: CvFormBuilderService, useValue: cvFormBuilderServiceMock },
      ],
    });
    service = TestBed.inject(ExperienceService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return formArray from state', () => {
    expect(service.formArray()).toBe(experienceArray);
  });
  describe('add', () => {
    it('should add a new experience group to the form array', () => {
      expect(experienceArray.length).toBe(0);
      service.add();
      expect(experienceArray.length).toBe(1);
      expect(cvFormBuilderServiceMock.createExperienceGroup).toHaveBeenCalled();
    });
  });
  describe('remove', () => {
    it('should remove experience group at index', () => {
      // Arrange
      experienceArray.push(new FormGroup({}));
      experienceArray.push(new FormGroup({}));
      expect(experienceArray.length).toBe(2);
      // Act
      service.remove(0);
      // Assert
      expect(experienceArray.length).toBe(1);
    });
  });
});
