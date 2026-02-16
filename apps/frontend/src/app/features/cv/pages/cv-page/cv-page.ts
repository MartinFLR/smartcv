import {
  TuiFade,
  TuiTabs,
  TuiTabsWithMore,
  TuiSelect,
  TuiDataListWrapper,
  TuiChevron,
} from '@taiga-ui/kit';
import { TuiItem } from '@taiga-ui/cdk';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TUI_DARK_MODE, TuiScrollbar, TuiSelectLike, TuiTextfield } from '@taiga-ui/core';
import { DummyView } from '../../components/dummy-view/dummy-view';
import { IaSection } from '../../components/ia-section/ia-section.component';
import { SkillsSection } from '../../components/skills-section/skills-section';
import { ProjectsSection } from '../../components/projects-section/projects-section';
import { ExperienceSection } from '../../components/experience-section/experience-section';
import { EducationSection } from '../../components/education-section/education-section';
import { PersonalSection } from '../../components/personal-section/personal-section';
import { Actions } from '../../components/actions/actions';
import { ATSSection } from '../../components/ats-section/ats-section';
import { CoverLetterSection } from '../../components/cover-letter-section/cover-letter-section';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TranslocoDirective } from '@jsverse/transloco';
import { NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { TuiSwipe, TuiSwipeEvent } from '@taiga-ui/cdk';
import { CvStateService } from '../../services/cv-form/cv-form-state/cv-state.service';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TuiTabs,
    TuiFade,
    TuiTabsWithMore,
    TuiItem,
    TuiSelect,
    TuiTextfield,
    TuiDataListWrapper,
    TuiChevron,
    DummyView,
    IaSection,
    SkillsSection,
    ProjectsSection,
    ExperienceSection,
    EducationSection,
    PersonalSection,
    Actions,
    ATSSection,
    CoverLetterSection,
    TuiCardLarge,
    TranslocoDirective,
    NgTemplateOutlet,
    TuiSwipe,
    TuiScrollbar,
    TitleCasePipe,
    TuiSelectLike,
  ],
  templateUrl: './cv-page.html',
})
export class CvPage {
  protected readonly state = inject(CvStateService);

  protected readonly darkMode = inject(TUI_DARK_MODE);

  protected readonly activeTab = signal(0);
  protected readonly mobileView = signal(0);

  protected readonly templates = ['harvard', 'creative'];

  protected readonly stringify = (item: string): string =>
    item ? item.charAt(0).toUpperCase() + item.slice(1) : '';

  private readonly TOTAL_FORM_TABS = 8;

  protected onFormSwipe(event: TuiSwipeEvent): void {
    const direction = event.direction;
    const currentTab = this.activeTab();

    if (direction === 'right' && currentTab > 0) {
      this.activeTab.update((v) => v - 1);
    } else if (direction === 'left' && currentTab < this.TOTAL_FORM_TABS - 1) {
      this.activeTab.update((v) => v + 1);
    }
  }

  protected onViewSwipe(event: TuiSwipeEvent): void {
    const direction = event.direction;
    const currentView = this.mobileView();

    if (currentView === 0 && direction === 'left') {
      this.mobileView.set(1);
    } else if (currentView === 1 && direction === 'right') {
      this.mobileView.set(0);
    }
  }
}
