import {TuiFade, TuiTabs} from '@taiga-ui/kit';
import {Component, computed, inject, Signal, signal} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiAlertService} from '@taiga-ui/core';
import {defer, finalize, map, startWith} from 'rxjs';
import {PdfService} from '../../services/pdf/pdf.service';
import {SaveDataService} from '../../services/save-data/save-data.service';
import {CvFormBuilderService} from '../../services/cv-form-builder/cv-form-builder.service';
import {IaService} from '../../services/ia.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {DummyView} from './components/dummy-view/dummy-view';
import {IaSection} from './components/ia-section/ia-section.component';
import {SkillsSection} from './components/skills-section/skills-section';
import {ProjectsSection} from './components/projects-section/projects-section';
import {ExperienceSection} from './components/experience-section/experience-section';
import {EducationSection} from './components/education-section/education-section';
import {PersonalInfo} from './components/personal-info/personal-info';
import {Actions} from './components/actions/actions';
import {TemperatureLevel, ToneLevel} from '../../../../shared/types/PromptTypes';
import {ATSSection} from './components/ats-section/ats-section';
import {CoverLetterSection} from './components/cover-letter-section/cover-letter-section';
import {CoverLetterService} from './components/cover-letter-section/cover-letter-service/cover-letter.service';
import {
  CertificationControls,
  CvFormControls,
  EducationControls, ExperienceControls,
  IaFormControls,
  PersonalInfoControls, ProjectControls, SkillsControls
} from '../../../../shared/types/Controls';
import {CvForm, CvPayload, TransformedCvResponse} from '../../../../shared/types/Types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule, TuiTabs, TuiFade,
    DummyView, IaSection, SkillsSection,
    ProjectsSection, ExperienceSection, EducationSection,
    PersonalInfo, Actions, ATSSection, CoverLetterSection
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly alerts = inject(TuiAlertService);
  private readonly fb = inject(FormBuilder);
  private readonly pdfService = inject(PdfService);
  private readonly iaService = inject(IaService);
  private readonly saveDataService = inject(SaveDataService);
  private readonly cvFormBuilderService = inject(CvFormBuilderService);
  private readonly coverLetterService = inject(CoverLetterService);

  protected activeTab = signal(0);
  protected isLoading = signal(false);

  protected cvForm: FormGroup<CvFormControls>;
  protected iaForm: FormGroup<IaFormControls>;

  protected cvPreview: Signal<CvForm>;
  protected hasExperience: Signal<boolean>;
  protected hasEducation: Signal<boolean>;
  protected hasSkills: Signal<boolean>;
  protected hasProjects: Signal<boolean>;

  constructor() {
    this.cvForm = this.cvFormBuilderService.buildCvForm();
    this.iaForm = this.createIaForm();
    this.loadCvData();

    this.cvPreview = toSignal(
      this.cvForm.valueChanges.pipe(
        startWith(this.cvForm.getRawValue()),
        map(() => this.cvForm.getRawValue() as CvForm)
      ),
      { initialValue: this.cvForm.getRawValue() as CvForm }
    );

    this.hasEducation = computed(() => !!this.cvPreview().education?.length);
    this.hasExperience = computed(() => !!this.cvPreview().experience?.length);
    this.hasProjects = computed(() => !!this.cvPreview().projects?.length);
    this.hasSkills = computed(() => {
      const skillsArray = this.cvPreview().skills;
      if (!skillsArray || skillsArray.length === 0) return false;
      return skillsArray.some(group =>
        (group.skills && group.skills.length > 0) ||
        (group.languages && group.languages.length > 0) ||
        (group.certifications && group.certifications.length > 0) ||
        (group.additional && group.additional.length > 0)
      );
    });

    if (!this.experienceForms.length) this.addExperience();
    if (!this.projectForms.length) this.addProject();
    if (!this.educationForms.length) this.addEducation();
    if (!this.skillsForms.length) this.addSkill();
  }


  private createIaForm(): FormGroup<IaFormControls> {
    return this.fb.group<IaFormControls>({
      jobDescription: this.fb.control<string | null>(''),
      makeEnglish: this.fb.control<boolean | null>(false),
      exaggeration: this.fb.control<number | null>(0)
    });
  }

  optimizarCv(): void {
    if (this.isLoading()) return;

    if (this.iaForm.invalid) {
      this.alerts.open(
        'Falta la descripción del puesto (Job Description).',
        { appearance: 'error' }
      ).subscribe();
      return;
    }

    this.isLoading.set(true);
    const rawCv: CvForm = this.cvForm.getRawValue() as CvForm;
    const temperature = this.detectTemperature(this.iaForm.getRawValue().exaggeration ?? 0);
    const payload: CvPayload = {
      baseCv: rawCv,
      jobDesc: this.iaForm.getRawValue().jobDescription ?? '',
      promptOption: { temperature }
    };

    this.iaService.generateCvWithIA(payload)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response: TransformedCvResponse) => {
          this.patchFormArrays(response);
          this.cvForm.patchValue({
            personalInfo: {
              ...this.cvForm.value.personalInfo,
              profileSummary: response.profileSummary,
              job: response.job
            }
          });
          this.saveDataService.saveData(this.cvForm.getRawValue() as CvForm);
          this.alerts.open('CV optimizado con IA. ¡Revisá los cambios!', { appearance: 'success', autoClose: 5000 }).subscribe();
        },
        error: (err) => {
          console.error('Error de IA:', err);
          const message = err.message || 'Error al conectar con la IA. Intente de nuevo.';
          this.alerts.open(message,
            {
            appearance: 'error',
            autoClose: 7000
            }).subscribe();
        }
      });
  }

  downloadPdf(): void {
    const data: CvForm = this.cvForm.getRawValue() as CvForm;
    this.pdfService.downloadPdf(data);
  }

  saveCv(): void {
    this.saveDataService.saveData(this.cvForm.getRawValue() as CvForm);
    this.alerts.open('Datos guardados localmente.', { appearance: 'info', autoClose: 3000 }).subscribe();
  }

  clearCv(): void {
    this.experienceForms.clear();
    this.educationForms.clear();
    this.skillsForms.clear();
    this.projectForms.clear();
    this.cvForm.reset();
    this.addExperience();
    this.addEducation();
    this.addSkill();
    this.addProject();
    this.saveDataService.clearData();
    this.alerts.open(
      'CV limpiado. Inicie un nuevo CV.', {
      appearance: 'warning',
      autoClose: 3000
      }).subscribe();
  }

  // --- Lógica  ---
  private detectTemperature(num: number): TemperatureLevel {
    switch (num) {
      case 0: return 'low';
      case 1: return 'medium';
      case 2: return 'high';
      default: return 'low';
    }
  }

  private patchFormArrays(response: TransformedCvResponse): void {
    const applyPatch = <T extends FormGroup>(
      array: FormArray<T>,
      data: any[],
      creator: (item: any) => T,
      patchFields: (item: any) => Partial<T['controls']>
    ) => {
      array.clear();
      data.forEach(item => {
        const newGroup = creator(item);
        newGroup.patchValue(patchFields(item));
        array.push(newGroup);
      });
    };

    applyPatch(this.experienceForms, response.experience,
      (exp) => this.cvFormBuilderService.createExperienceGroup(exp),
      (exp) => ({ ...exp, bullets: exp.bullets || '' }),
    );

    applyPatch(this.educationForms, response.education,
      (edu) => this.cvFormBuilderService.createEducationGroup(edu),
      (edu) => ({ ...edu, bullets: edu.bullets || '' })
    );

    applyPatch(this.projectForms, response.project,
      (pj) => this.cvFormBuilderService.createProjectGroup(pj),
      (pj) => ({ ...pj, bullets: pj.bullets || '', name: pj.name || '', subtitle: pj.subtitle || '' })
    );

    applyPatch(this.skillsForms, response.skills,
      (s) => this.cvFormBuilderService.createSkillGroup(s),
      (s) => ({
        skills: s.skills || [],
        languages: s.languages || [],
        certifications: s.certifications || [], // Asumimos que la IA puede devolver certificaciones
        additional: s.additional || []
      })
    );
  }

  private loadCvData(): void {
    const savedData = this.saveDataService.loadData();
    if (!savedData) return;

    this.educationForms.clear();
    (savedData.education || []).forEach((e: any) => this.educationForms.push(this.cvFormBuilderService.createEducationGroup(e)));

    this.experienceForms.clear();
    (savedData.experience || []).forEach((e: any) => this.experienceForms.push(this.cvFormBuilderService.createExperienceGroup(e)));

    this.projectForms.clear();
    (savedData.projects || []).forEach((e: any) => this.projectForms.push(this.cvFormBuilderService.createProjectGroup(e)));

    this.skillsForms.clear();
    (savedData.skills || []).forEach((s: any) => {
      this.skillsForms.push(this.cvFormBuilderService.createSkillGroup(s));
    });

    if (!this.experienceForms.length) this.addExperience();
    if (!this.projectForms.length) this.addProject();
    if (!this.educationForms.length) this.addEducation();
    if (!this.skillsForms.length) this.addSkill();

    this.cvForm.patchValue(savedData);
    this.alerts.open('CV cargado desde la sesión anterior', { appearance: 'info', autoClose: 3000 }).subscribe();
  }



  // --- Manipulación  ---
  addEducation(): void {
    this.educationForms.push(this.cvFormBuilderService.createEducationGroup());
  }
  removeEducation(i: number): void {
    this.educationForms.removeAt(i);
  }

  addExperience(): void {
    this.experienceForms.push(this.cvFormBuilderService.createExperienceGroup());
  }
  removeExperience(i: number): void {
    this.experienceForms.removeAt(i);
  }

  addProject(): void {
    this.projectForms.push(this.cvFormBuilderService.createProjectGroup());
  }
  removeProject(i: number): void {
    this.projectForms.removeAt(i);
  }

  addSkill(): void {
    this.skillsForms.push(this.cvFormBuilderService.createSkillGroup());
  }
  removeSkill(i: number): void {
    this.skillsForms.removeAt(i);
  }

  addCertification(skillGroupIndex: number): void {
    const certificationsArray = this.skillsForms.at(skillGroupIndex)?.get('certifications') as FormArray<FormGroup<CertificationControls>> | null;
    if (certificationsArray) {
      certificationsArray.push(this.cvFormBuilderService.createCertificationGroup());
    }
  }
  removeCertification(event: { skillGroupIndex: number; certIndex: number }): void {
    const certificationsArray = this.skillsForms.at(event.skillGroupIndex)?.get('certifications') as FormArray<FormGroup<CertificationControls>> | null;
    if (certificationsArray) {
      certificationsArray.removeAt(event.certIndex);
    }
  }


  // --- Getters ---
  get personalInfoGroup(): FormGroup<PersonalInfoControls> {
    return this.cvForm.get('personalInfo') as FormGroup<PersonalInfoControls>;
  }
  get educationForms(): FormArray<FormGroup<EducationControls>> {
    return this.cvForm.get('education') as FormArray<FormGroup<EducationControls>>;
  }
  get experienceForms(): FormArray<FormGroup<ExperienceControls>> {
    return this.cvForm.get('experience') as FormArray<FormGroup<ExperienceControls>>;
  }
  get projectForms(): FormArray<FormGroup<ProjectControls>> {
    return this.cvForm.get('projects') as FormArray<FormGroup<ProjectControls>>;
  }
  get skillsForms(): FormArray<FormGroup<SkillsControls>> {
    return this.cvForm.get('skills') as FormArray<FormGroup<SkillsControls>>;
  }
}
