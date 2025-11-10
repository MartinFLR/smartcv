import { Component, input } from '@angular/core';
import { CvForm } from '../../../../../../../shared/types/Types';

@Component({
  selector: 'app-dummy-view',
  imports: [],
  templateUrl: './dummy-view.html',
  styleUrl: './dummy-view.css',
})
export class DummyView {
  cvPreview = input<CvForm>();
  hasExperience = input<boolean>();
  hasEducation = input<boolean>();
  hasSkills = input<boolean>();
  hasProjects = input<boolean>();

  protected filterTruthy(arr: (string | null | undefined)[]): string[] {
    return arr.filter((value) => value && value.length > 0) as string[];
  }

  protected formatCertifications(certs: { name: string | null; date: string | null }[]): string {
    if (!certs || certs.length === 0) {
      return '';
    }
    return certs
      .map((c) => {
        const name = c.name || '';
        const datePart = c.date ? ` (${c.date})` : '';
        return `${name}${datePart}`;
      })
      .filter((c) => c.trim().length > 0)
      .join(' | ');
  }
}
