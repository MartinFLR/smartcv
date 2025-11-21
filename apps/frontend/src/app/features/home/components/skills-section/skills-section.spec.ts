import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsSection } from './skills-section';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { By } from '@angular/platform-browser';
import { jest } from '@jest/globals';
import { CertificationControls, SkillsControls } from '../../../../core/models/controls.model';

describe('SkillsSection', () => {
  let component: SkillsSection;
  let fixture: ComponentFixture<SkillsSection>;

  const createCertificationGroup = (name = 'Cert 1') => {
    return new FormGroup<CertificationControls>({
      name: new FormControl(name),
      date: new FormControl('2024'),
    });
  };

  const createSkillGroup = (skills: string[] = ['Angular'], certs: string[] = []) => {
    return new FormGroup<SkillsControls>({
      skills: new FormControl(skills),
      languages: new FormControl(['Spanish']),
      additional: new FormControl(['Leadership']),
      certifications: new FormArray<FormGroup<CertificationControls>>(
        certs.map((c) => createCertificationGroup(c)),
      ),
    });
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SkillsSection,
        ReactiveFormsModule,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsSection);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('skillsForms', new FormArray([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render skill groups correctly', async () => {
      const skillsArray = new FormArray([
        createSkillGroup(['Angular', 'React']),
        createSkillGroup(['NodeJS']),
      ]);

      fixture.componentRef.setInput('skillsForms', skillsArray);
      fixture.detectChanges();
      await fixture.whenStable();

      const chipInputs = fixture.debugElement.queryAll(By.css('input[tuiInputChip]'));
      expect(chipInputs.length).toBe(6);
    });

    it('should render certifications within a skill group', () => {
      const skillsArray = new FormArray([createSkillGroup([], ['AWS Certified', 'Google Cloud'])]);

      fixture.componentRef.setInput('skillsForms', skillsArray);
      fixture.detectChanges();

      const certNameInputs = fixture.debugElement.queryAll(By.css('input[formControlName="name"]'));
      expect(certNameInputs.length).toBe(2);
      expect(certNameInputs[0].nativeElement.value).toContain('AWS Certified');
    });
  });

  describe('Interactions (Outputs)', () => {
    it('should emit "addCert" with skill group index when Add Cert button is clicked', () => {
      const skillsArray = new FormArray([createSkillGroup()]); // Index 0
      fixture.componentRef.setInput('skillsForms', skillsArray);
      fixture.detectChanges();

      const emitSpy = jest.spyOn(component.addCert, 'emit');

      const addCertBtn = fixture.debugElement.query(By.css('button[iconStart="@tui.plus"]'));

      addCertBtn.nativeElement.click();

      expect(emitSpy).toHaveBeenCalledWith(0);
    });

    it('should emit "removeCert" with correct indices when Delete Cert button is clicked', () => {
      const skillsArray = new FormArray([createSkillGroup([], ['Cert A', 'Cert B'])]);
      fixture.componentRef.setInput('skillsForms', skillsArray);
      fixture.detectChanges();

      const emitSpy = jest.spyOn(component.removeCert, 'emit');

      const removeButtons = fixture.debugElement.queryAll(By.css('button[iconStart="@tui.trash"]'));

      removeButtons[1].nativeElement.click();

      expect(emitSpy).toHaveBeenCalledWith({ skillGroupIndex: 0, certIndex: 1 });
    });
  });

  describe('Helper Methods', () => {
    it('should return correct controls array from getCertificationControls', () => {
      const skillGroup = createSkillGroup([], ['Cert 1']);
      const controls = component.getCertificationControls(skillGroup);

      expect(controls.length).toBe(1);
      expect(controls[0].value.name).toBe('Cert 1');
    });
  });
});
