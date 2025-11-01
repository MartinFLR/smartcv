import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationSection } from './education-section';

describe('EducationSection', () => {
  let component: EducationSection;
  let fixture: ComponentFixture<EducationSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
