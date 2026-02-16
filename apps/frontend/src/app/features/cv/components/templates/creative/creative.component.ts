import { Component, input } from '@angular/core';
import { CvForm } from '@smartcv/types';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-creative-template',
  imports: [TuiCardLarge, TranslocoDirective],
  templateUrl: './creative.component.html',
  styleUrl: './creative.component.css',
})
export class CreativeTemplateComponent {
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
        if (!c.name || c.name.trim().length === 0) return '';

        const datePart = c.date ? ` (${c.date})` : '';
        return `${c.name}${datePart}`;
      })
      .filter((s) => s.length > 0)
      .join(' | ');
  }
}
