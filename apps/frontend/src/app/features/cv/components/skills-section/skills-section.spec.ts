import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsService } from './skills-service/skills.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { SkillsSection } from './skills-section';

// 1. Mock del Servicio
const mockSkillsService = {
  formArray: jest.fn(),
  getCertificationsControls: jest.fn(),
  addCertification: jest.fn(),
  removeCertification: jest.fn(),
};

describe('SkillsSection', () => {
  let component: SkillsSection;
  let fixture: ComponentFixture<SkillsSection>;

  const createSkillGroup = () =>
    new FormGroup({
      skills: new FormControl([]),
      languages: new FormControl([]),
      certifications: new FormArray([]),
      additional: new FormControl([]),
    });

  beforeEach(async () => {
    jest.clearAllMocks();

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

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  describe('Renderizado de Estructura', () => {
    it('debe renderizar los inputs principales', () => {
      const skillsInput = fixture.debugElement.query(By.css('#skillsSkills'));
      const langInput = fixture.debugElement.query(By.css('#skillsLanguages'));
      const addInput = fixture.debugElement.query(By.css('#skillsAdditional'));

      expect(skillsInput).toBeTruthy();
      expect(langInput).toBeTruthy();
      expect(addInput).toBeTruthy();
    });

    it('debe mostrar el mensaje de "sin certificaciones" cuando está vacío', () => {
      const emptyMessage = fixture.debugElement.query(By.css('p.text-gray-500'));
      expect(emptyMessage).toBeTruthy();
    });
  });

  describe('Renderizado de Certificaciones', () => {
    it('debe renderizar las tarjetas de certificación si el servicio las devuelve', () => {
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

  describe('Interacciones', () => {
    it('debe llamar a addCertification al hacer click en agregar', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button'));

      const addBtn = buttons.find((btn) =>
        btn.nativeElement.textContent.includes('cv.skills.certifications.button'),
      );

      expect(addBtn).toBeTruthy();

      addBtn?.nativeElement.click();

      expect(mockSkillsService.addCertification).toHaveBeenCalledWith(0);
    });

    it('debe llamar a removeCertification al hacer click en eliminar', () => {
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
