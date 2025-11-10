import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceSection } from './experience-section';

describe('ExperienceSection', () => {
  let component: ExperienceSection;
  let fixture: ComponentFixture<ExperienceSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
