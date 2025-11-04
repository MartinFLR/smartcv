import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverLetterSection } from './cover-letter-section';

describe('CoverLetterSection', () => {
  let component: CoverLetterSection;
  let fixture: ComponentFixture<CoverLetterSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoverLetterSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverLetterSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
