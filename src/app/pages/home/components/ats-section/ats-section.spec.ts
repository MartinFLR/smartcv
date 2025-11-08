import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ATSSection } from './ats-section';

describe('ATSSection', () => {
  let component: ATSSection;
  let fixture: ComponentFixture<ATSSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ATSSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ATSSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
