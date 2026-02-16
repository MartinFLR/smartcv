import { TestBed } from '@angular/core/testing';
import { SkillsService } from './skills.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { CvFormBuilderService } from '../../../services/cv-form/cv-form-builder/cv-form-builder.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { jest } from '@jest/globals';
describe('SkillsService', () => {
  let service: SkillsService;
  let cvStateServiceMock: any;
  let cvFormBuilderServiceMock: any;
  let mockSkillsArray: FormArray;
  beforeEach(() => {
    mockSkillsArray = new FormArray<any>([]);
    cvStateServiceMock = {
      skillsArray: mockSkillsArray,
    };
    cvFormBuilderServiceMock = {
      createSkillGroup: jest.fn().mockReturnValue(
        new FormGroup({
          skills: new FormControl([]),
          certifications: new FormArray([]),
        }),
      ),
      createCertificationGroup: jest.fn().mockReturnValue(
        new FormGroup({
          name: new FormControl(''),
          date: new FormControl(''),
        }),
      ),
    };
    TestBed.configureTestingModule({
      providers: [
        SkillsService,
        { provide: CvStateService, useValue: cvStateServiceMock },
        { provide: CvFormBuilderService, useValue: cvFormBuilderServiceMock },
      ],
    });
    service = TestBed.inject(SkillsService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return formArray from state', () => {
    expect(service.formArray()).toBe(mockSkillsArray);
  });
  describe('Skill Groups', () => {
    it('should add a new skill group', () => {
      service.addSkillGroup();
      expect(mockSkillsArray.length).toBe(1);
      expect(cvFormBuilderServiceMock.createSkillGroup).toHaveBeenCalled();
    });
    it('should remove skill group at index', () => {
      mockSkillsArray.push(new FormGroup({}));
      expect(mockSkillsArray.length).toBe(1);
      service.removeSkillGroup(0);
      expect(mockSkillsArray.length).toBe(0);
    });
  });
  describe('Certifications', () => {
    beforeEach(() => {
      // Add a skill group to work with
      const skillGroup = new FormGroup({
        skills: new FormControl([]),
        certifications: new FormArray([]),
      });
      mockSkillsArray.push(skillGroup);
    });
    it('should add certification to a specific skill group', () => {
      service.addCertification(0);
      const skillGroup = mockSkillsArray.at(0) as FormGroup;
      const certs = skillGroup.controls['certifications'] as FormArray;
      expect(certs.length).toBe(1);
      expect(cvFormBuilderServiceMock.createCertificationGroup).toHaveBeenCalled();
    });
    it('should remove certification from a specific skill group', () => {
      // Add one cert first
      const skillGroup = mockSkillsArray.at(0) as FormGroup;
      const certs = skillGroup.controls['certifications'] as FormArray;
      certs.push(new FormGroup({}));
      expect(certs.length).toBe(1);
      service.removeCertification(0, 0);
      expect(certs.length).toBe(0);
    });
    it('should do nothing if skill group does not exist when adding cert', () => {
      service.addCertification(99); // Invalid index
      expect(cvFormBuilderServiceMock.createCertificationGroup).not.toHaveBeenCalled();
    });
    it('should do nothing if skill group does not exist when removing cert', () => {
      service.removeCertification(99, 0); // Invalid index
      // No crash expected
    });
  });
  describe('getCertificationsControls', () => {
    it('should return controls of certifications form array', () => {
      const certGroup = new FormGroup({});
      const skillGroup = new FormGroup({
        certifications: new FormArray([certGroup]),
      });
      const controls = service.getCertificationsControls(skillGroup);
      expect(controls.length).toBe(1);
      expect(controls[0]).toBe(certGroup);
    });
  });
});
