import { TestBed } from '@angular/core/testing';
import { ProjectsService } from './projects.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { CvFormBuilderService } from '../../../services/cv-form/cv-form-builder/cv-form-builder.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { signal } from '@angular/core';
import { jest } from '@jest/globals';
describe('ProjectsService', () => {
  let service: ProjectsService;
  let cvStateServiceMock: any;
  let cvFormBuilderServiceMock: any;
  let mockProjectsArray: FormArray;
  beforeEach(() => {
    mockProjectsArray = new FormArray<any>([]);
    cvStateServiceMock = {
      projectsArray: mockProjectsArray,
    };
    cvFormBuilderServiceMock = {
      createProjectGroup: jest.fn().mockReturnValue(
        new FormGroup({
          name: new FormControl('New Project'),
        }),
      ),
    };
    TestBed.configureTestingModule({
      providers: [
        ProjectsService,
        { provide: CvStateService, useValue: cvStateServiceMock },
        { provide: CvFormBuilderService, useValue: cvFormBuilderServiceMock },
      ],
    });
    service = TestBed.inject(ProjectsService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return formArray from state', () => {
    expect(service.formArray()).toBe(mockProjectsArray);
  });
  describe('add', () => {
    it('should add a new project group to the form array', () => {
      service.add();
      expect(mockProjectsArray.length).toBe(1);
      expect(cvFormBuilderServiceMock.createProjectGroup).toHaveBeenCalled();
    });
  });
  describe('remove', () => {
    it('should remove project group at index', () => {
      mockProjectsArray.push(new FormGroup({}));
      expect(mockProjectsArray.length).toBe(1);
      service.remove(0);
      expect(mockProjectsArray.length).toBe(0);
    });
  });
});
