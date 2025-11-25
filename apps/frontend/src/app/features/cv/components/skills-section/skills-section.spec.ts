import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsService } from './skills-service/skills.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { SkillsSection } from './skills-section';
import { jest } from '@jest/globals';

describe('SkillsSection', () => {
  let component: SkillsSection;
  let fixture: ComponentFixture<SkillsSection>;
  let mockSkillsService: any;

  const createSkillGroup = () =>
    new FormGroup({
      skills: new FormControl([]),
      languages: new FormControl([]),
      certifications: new FormArray([]),
      additional: new FormControl([]),
    });

  beforeEach(async () => {
    mockSkillsService = {
      formArray: jest.fn(),
      getCertificationsControls: jest.fn(),
      addCertification: jest.fn(),
      removeCertification: jest.fn(),
    };

    const defaultFormArray = new FormArray([createSkillGroup()]);
    mockSkillsService.formArray.mockReturnValue(defaultFormArray);
    mockSkillsService.getCertificationsControls.mockReturnValue([]);

    await TestBed.configureTestingModule({
      imports: [
        SkillsSection,
        ReactiveFormsModule,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [{ provide: SkillsService, useValue: mockSkillsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Structure Rendering', () => {
    it('should render main inputs', () => {
      const skillsInput = fixture.debugElement.query(By.css('#skillsSkills'));
      const langInput = fixture.debugElement.query(By.css('#skillsLanguages'));
      const addInput = fixture.debugElement.query(By.css('#skillsAdditional'));

      expect(skillsInput).toBeTruthy();
      expect(langInput).toBeTruthy();
      expect(addInput).toBeTruthy();
    });

    it('should show "no certifications" message when empty', () => {
      const emptyMessage = fixture.debugElement.query(By.css('p.text-gray-500'));
      expect(emptyMessage).toBeTruthy();
    });
  });

  describe('Certifications Rendering', () => {
    it('should render certification cards if service returns them', () => {
      const certGroup1 = new FormGroup({
        name: new FormControl('Java'),
        date: new FormControl('2023'),
      });
      const certGroup2 = new FormGroup({
        name: new FormControl('Angular'),
        date: new FormControl('2024'),
      });

      mockSkillsService.getCertificationsControls.mockReturnValue([certGroup1, certGroup2]);

      fixture.detectChanges();

      const emptyMessage = fixture.debugElement.query(By.css('p.text-gray-500'));
      expect(emptyMessage).toBeNull();

      const cards = fixture.debugElement.queryAll(By.css('[tuiCardLarge]'));
      expect(cards.length).toBe(2);
    });
  });

  describe('Interactions', () => {
    it('should call addCertification when add button is clicked', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button'));

      // Find the button that adds certification (usually has specific text or icon)
      // Based on previous file content, it looked for text content.
      // Let's look for the one that is NOT the delete button.
      // Or better, look for the text binding.
      const addBtn = buttons.find((btn) =>
        btn.nativeElement.textContent.includes('cv.skills.certifications.button'),
      );

      expect(addBtn).toBeTruthy();

      addBtn?.nativeElement.click();

      expect(mockSkillsService.addCertification).toHaveBeenCalledWith(0);
    });

    it('should call removeCertification when delete button is clicked', () => {
      const certGroup = new FormGroup({ name: new FormControl(''), date: new FormControl('') });
      mockSkillsService.getCertificationsControls.mockReturnValue([certGroup]);
      fixture.detectChanges();

      const deleteBtn = fixture.debugElement.query(
        By.css('button[appearance="action-destructive"]'),
      );

      expect(deleteBtn).toBeTruthy();

      deleteBtn.nativeElement.click();

      expect(mockSkillsService.removeCertification).toHaveBeenCalledWith(0, 0);
    });
  });
});
