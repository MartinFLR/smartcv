import { TuiFade, TuiTabs } from '@taiga-ui/kit';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TUI_DARK_MODE } from '@taiga-ui/core';
import { DummyView } from './components/dummy-view/dummy-view';
import { IaSection } from './components/ia-section/ia-section.component';
import { SkillsSection } from './components/skills-section/skills-section';
import { ProjectsSection } from './components/projects-section/projects-section';
import { ExperienceSection } from './components/experience-section/experience-section';
import { EducationSection } from './components/education-section/education-section';
import { PersonalInfo } from './components/personal-info/personal-info';
import { Actions } from './components/actions/actions';
import { ATSSection } from './components/ats-section/ats-section';
import { CoverLetterSection } from './components/cover-letter-section/cover-letter-section';
import { TuiCardLarge } from '@taiga-ui/layout';
import { HomeStateService } from './services/home-state-service/home-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiTabs,
    TuiFade,
    DummyView,
    IaSection,
    SkillsSection,
    ProjectsSection,
    ExperienceSection,
    EducationSection,
    PersonalInfo,
    Actions,
    ATSSection,
    CoverLetterSection,
    TuiCardLarge,
  ],
  templateUrl: './home.html',
})
export class Home {
  protected readonly state = inject(HomeStateService);

  protected readonly darkMode = inject(TUI_DARK_MODE);
}
