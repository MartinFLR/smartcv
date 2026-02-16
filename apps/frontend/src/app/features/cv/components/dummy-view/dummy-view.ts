import { Component, input } from '@angular/core';
import { CvForm } from '@smartcv/types';
import { HarvardTemplateComponent } from '../templates/harvard/harvard.component';
import { CreativeTemplateComponent } from '../templates/creative/creative.component';

@Component({
  selector: 'app-dummy-view',
  imports: [HarvardTemplateComponent, CreativeTemplateComponent],
  templateUrl: './dummy-view.html',
  styleUrl: './dummy-view.css',
})
export class DummyView {
  cvPreview = input<CvForm>();
  hasExperience = input<boolean>();
  hasEducation = input<boolean>();
  hasSkills = input<boolean>();
  hasProjects = input<boolean>();
  template = input<string>('harvard'); // Default to harvard
}
