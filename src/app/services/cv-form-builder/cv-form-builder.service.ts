import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {
  CvFormControls,
  PersonalInfoControls,
  ExperienceControls,
  TransformedExperience,
  ProjectControls,
  TransformedProject,
  EducationControls,
  TransformedEducation,
  SkillsControls,
  CertificationControls, IaFormControls, CoverLetterControls
} from '../../../../shared/types/types';

@Injectable({
  providedIn: 'root'
})
export class CvFormBuilderService {
  private readonly fb = inject(FormBuilder);

  public buildCvForm(): FormGroup<CvFormControls> {
    return this.fb.group<CvFormControls>({
      personalInfo: this.createPersonalInfoGroup(),
      education: this.fb.array<FormGroup<EducationControls>>([]),
      experience: this.fb.array<FormGroup<ExperienceControls>>([]),
      projects: this.fb.array<FormGroup<ProjectControls>>([]),
      skills: this.fb.array<FormGroup<SkillsControls>>([]),
    });
  }

  // Métodos factory
  public createPersonalInfoGroup(): FormGroup<PersonalInfoControls> {
    return this.fb.group<PersonalInfoControls>({
      name: this.fb.control<string | null>('', Validators.required),
      job: this.fb.control<string | null>('', Validators.required),
      email: this.fb.control<string | null>(''),
      phone: this.fb.control<string | null>(''),
      linkedin: this.fb.control<string | null>(''),
      location: this.fb.control<string | null>(''),
      github: this.fb.control<string | null>(''),
      web: this.fb.control<string | null>(''),
      profileSummary: this.fb.control<string | null>(''),
    });
  }

  public createExperienceGroup(exp?: Partial<TransformedExperience>): FormGroup<ExperienceControls> {
    return this.fb.group<ExperienceControls>({
      role: this.fb.control<string | null>(exp?.role || ''),
      company: this.fb.control<string | null>(exp?.company || ''),
      dateIn: this.fb.control<string | null>(exp?.dateIn || ''),
      dateFin: this.fb.control<string | null>(exp?.dateFin || ''),
      bullets: this.fb.control<string | null>(exp?.bullets || '')
    });
  }

  public createProjectGroup(proj?: Partial<TransformedProject>): FormGroup<ProjectControls> {
    return this.fb.group<ProjectControls>({
      name: this.fb.control<string | null>(proj?.name || ''),
      subtitle: this.fb.control<string | null>(proj?.subtitle || ''),
      dateIn: this.fb.control<string | null>(proj?.dateIn || ''),
      dateFin: this.fb.control<string | null>(proj?.dateFin || ''),
      bullets: this.fb.control<string | null>(proj?.bullets || '')
    });
  }

  public createEducationGroup(edu?: Partial<TransformedEducation>): FormGroup<EducationControls> {
    return this.fb.group<EducationControls>({
      title: this.fb.control<string | null>(edu?.title || ''),
      institution: this.fb.control<string | null>(edu?.institution || ''),
      bullets: this.fb.control<string | null>(edu?.bullets || ''),
      dateIn: this.fb.control<string | null>(edu?.dateIn || ''),
      dateFin: this.fb.control<string | null>(edu?.dateFin || ''),
    });
  }

  public createCertificationGroup(cert?: { name?: string | null; date?: string | null }): FormGroup<CertificationControls> {
    return this.fb.group<CertificationControls>({
      name: this.fb.control<string | null>(cert?.name ?? null),
      date: this.fb.control<string | null>(cert?.date ?? null)
    });
  }

  public createSkillGroup(skillObj?: Partial<{ skills: string[]; languages: string[]; certifications: { name: string; date: string }[]; additional: string[] }>): FormGroup<SkillsControls> {
    const certsArray = this.fb.array<FormGroup<CertificationControls>>(
      (skillObj?.certifications || []).map(c => this.createCertificationGroup(c))
    );

    return this.fb.group<SkillsControls>({
      skills: this.fb.control<string[] | null>(skillObj?.skills || []),
      languages: this.fb.control<string[] | null>(skillObj?.languages || []),
      certifications: certsArray,
      additional: this.fb.control<string[] | null>(skillObj?.additional || [])
    });
  }


  private createIaForm(): FormGroup<IaFormControls> {
    return this.fb.group<IaFormControls>({
      jobDescription: this.fb.control<string | null>('', Validators.required),
      makeEnglish: this.fb.control<boolean | null>(false),
      exaggeration: this.fb.control<number | null>(0)
    });
  }


  public buildCoverLetterForm(): FormGroup<CoverLetterControls> {
    return this.fb.group<CoverLetterControls>({
      recruiterName: this.fb.control<string | null>(''),
      companyName: this.fb.control<string | null>(''),
      referralName: this.fb.control<string | null>(''),
      tone: this.fb.control<number | null>(0),
      deliveryChannel: this.fb.control<number | null>(0),
    });
  }

}
