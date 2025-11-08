import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaSection } from './ia-section.component';

describe('IaTools', () => {
  let component: IaSection;
  let fixture: ComponentFixture<IaSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IaSection],
    }).compileComponents();

    fixture = TestBed.createComponent(IaSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
