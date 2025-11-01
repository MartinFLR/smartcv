import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyView } from './dummy-view';

describe('DummyView', () => {
  let component: DummyView;
  let fixture: ComponentFixture<DummyView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummyView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
