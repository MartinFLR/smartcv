import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaTools } from './ia-tools';

describe('IaTools', () => {
  let component: IaTools;
  let fixture: ComponentFixture<IaTools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IaTools]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IaTools);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
