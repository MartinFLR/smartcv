import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyView } from './dummy-view';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { By } from '@angular/platform-browser';
import { CvForm } from '@smartcv/types';
import { MOCK_CV_FORM } from '../../../../shared/testing/mocks/cv.form.mock';
describe('DummyView Component', () => {
  let component: DummyView;
  let fixture: ComponentFixture<DummyView>;
  // Versión mínima del CV para testing
  const MINIMAL_CV: CvForm = {
    personalInfo: {
      name: 'John Doe',
      job: 'Tester',
      email: 'a@b.com',
      linkedin: 'linkedin.com/test',
    } as any,
    experience: [],
    education: [],
    projects: [],
    skills: [],
  };
  // Versión de CV con datos complejos
  const COMPLEX_CV: CvForm = {
    ...MOCK_CV_FORM,
    experience: MOCK_CV_FORM.experience
      .map((exp) => ({
        ...exp,
        bullets: 'Bullet A\nBullet B\nBullet C',
      }))
      .slice(0, 1) as any, // Solo 1 experiencia
    skills: [
      {
        // Skill group con un certificado nulo
        skills: ['TS'],
        languages: ['ES'],
        additional: [''],
        certifications: [
          { name: 'AWS Certified', date: '2023' },
          { name: 'Scrum Master', date: null },
          { name: null, date: '2022' },
        ],
      },
    ] as any,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DummyView,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [provideAnimations()],
    }).compileComponents();
    fixture = TestBed.createComponent(DummyView);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('hasExperience', true);
    fixture.componentRef.setInput('hasSkills', true);
    fixture.componentRef.setInput('hasEducation', true);
    fixture.componentRef.setInput('hasProjects', true);
    fixture.componentRef.setInput('cvPreview', MINIMAL_CV);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // ----------------------------------------------------------------------------------------------------
  describe('Template Rendering and Data Integrity', () => {
    it('should render basic personal info (Name and Job)', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h2')?.textContent).toContain('John Doe');
    });
    it('should correctly display multi-line achievement bullets', () => {
      fixture.componentRef.setInput('cvPreview', COMPLEX_CV);
      fixture.detectChanges();
      const experienceItem = fixture.debugElement.query(By.css('.mb-\\[15pt\\] ul'));
      const bullets = experienceItem.queryAll(By.css('li'));
      expect(bullets.length).toBe(3);
      expect(bullets[0].nativeElement.textContent).toContain('Bullet A');
    });
    it('should display experience section title in uppercase and translated', () => {
      fixture.componentRef.setInput('cvPreview', COMPLEX_CV);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain('view.experience');
    });
    it('should correctly format and link URLs (e.g., LinkedIn)', () => {
      fixture.componentRef.setInput('cvPreview', MOCK_CV_FORM);
      fixture.detectChanges();
      const linkedinLink = fixture.debugElement.query(By.css('a[href*="linkedin.com"]'));
      expect(linkedinLink.nativeElement.href).toContain('https://linkedin.com/in/martin-dev');
    });
  });
});
