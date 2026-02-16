import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsSection } from './projects-section';
import { ProjectsService } from './projects-service/projects.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { jest } from '@jest/globals';
describe('ProjectsSection', () => {
  let component: ProjectsSection;
  let fixture: ComponentFixture<ProjectsSection>;
  let projectsServiceMock: any;
  let mockFormArray: FormArray;
  beforeEach(async () => {
    mockFormArray = new FormArray([
      new FormGroup({
        name: new FormControl('SmartCV'),
        subtitle: new FormControl('Angular Project'),
        dateIn: new FormControl(''),
        dateFin: new FormControl(''),
        bullets: new FormControl(''),
      }),
    ]);
    projectsServiceMock = {
      formArray: signal(mockFormArray),
      add: jest.fn(),
      remove: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [
        ProjectsSection,
        ReactiveFormsModule,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [provideAnimations(), { provide: ProjectsService, useValue: projectsServiceMock }],
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Rendering', () => {
    it('should render items from service formArray', () => {
      const items = fixture.debugElement.queryAll(By.css('button[tuiAccordion]'));
      expect(items.length).toBe(1);
      const nameInput = fixture.debugElement.query(By.css('input[formControlName="name"]'));
      expect(nameInput.nativeElement.value).toBe('SmartCV');
    });
    it('should update view when signal changes', () => {
      // Simulate adding another item
      const newGroup = new FormGroup({
        name: new FormControl('New Project'),
        subtitle: new FormControl(''),
        dateIn: new FormControl(''),
        dateFin: new FormControl(''),
        bullets: new FormControl(''),
      });
      // Create a NEW array instance to trigger signal change detection if it checks identity
      const newArray = new FormArray([...mockFormArray.controls, newGroup]);
      projectsServiceMock.formArray.set(newArray);
      fixture.detectChanges();
      const items = fixture.debugElement.queryAll(By.css('button[tuiAccordion]'));
      expect(items.length).toBe(2);
    });
  });
  describe('Interactions', () => {
    it('should call service.add() when Add button is clicked', () => {
      const addButton = fixture.debugElement.query(By.css('button[appearance="secondary"]'));
      addButton.nativeElement.click();
      expect(projectsServiceMock.add).toHaveBeenCalled();
    });
    it('should call service.remove(index) when Remove button is clicked', () => {
      const removeButton = fixture.debugElement.query(
        By.css('button[appearance="flat-destructive"]'),
      );
      removeButton.nativeElement.click();
      expect(projectsServiceMock.remove).toHaveBeenCalledWith(0);
    });
  });
});
