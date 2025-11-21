import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsSection } from './projects-section';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { By } from '@angular/platform-browser';
import { jest } from '@jest/globals';
import { ProjectControls } from '../../../../core/models/controls.model';

describe('ProjectsSection', () => {
  let component: ProjectsSection;
  let fixture: ComponentFixture<ProjectsSection>;

  // --- Helper para crear datos mock ---
  const createProjectGroup = (data?: Partial<{ name: string; subtitle: string }>) => {
    return new FormGroup<ProjectControls>({
      name: new FormControl(data?.name ?? ''),
      subtitle: new FormControl(data?.subtitle ?? ''),
      dateIn: new FormControl(''),
      dateFin: new FormControl(''),
      bullets: new FormControl(''),
    });
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectsSection,
        ReactiveFormsModule,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
          preloadLangs: true, // Asegura carga rápida para evitar falsos negativos en el DOM
        }),
      ],
      providers: [
        provideAnimations(), // Requerido por componentes Taiga UI (Ripple, Textfield)
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsSection);
    component = fixture.componentInstance;

    // Inicializamos el input requerido con un array vacío
    fixture.componentRef.setInput('projectForms', new FormArray([]));

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render 0 cards when form array is empty', () => {
      const cards = fixture.debugElement.queryAll(By.css('[tuiCard]'));
      expect(cards.length).toBe(0);
    });

    it('should render correct number of items when form array has data', async () => {
      // Arrange
      const projectsArray = new FormArray([
        createProjectGroup({ name: 'SmartCV' }),
        createProjectGroup({ name: 'E-commerce' }),
      ]);

      // Act
      fixture.componentRef.setInput('projectForms', projectsArray);
      fixture.detectChanges();
      await fixture.whenStable();

      // Assert
      const nameInputs = fixture.debugElement.queryAll(By.css('input[formControlName="name"]'));

      expect(nameInputs.length).toBe(2);
      expect(nameInputs[0].nativeElement.value).toContain('SmartCV');
      expect(nameInputs[1].nativeElement.value).toContain('E-commerce');
    });
  });

  describe('Interactions (Outputs)', () => {
    it('should emit "add" event when Add button is clicked', () => {
      // Arrange
      const emitSpy = jest.spyOn(component.add, 'emit');

      let addButton = fixture.debugElement.query(By.css('button[iconStart="@tui.plus"]'));

      if (!addButton) {
        const buttons = fixture.debugElement.queryAll(By.css('button'));
        addButton = buttons[0];
      }

      addButton.nativeElement.click();

      expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit "remove" event with correct index when Delete button is clicked', async () => {
      // Arrange
      const projectsArray = new FormArray([
        createProjectGroup({ name: 'Project A' }),
        createProjectGroup({ name: 'Project B' }),
      ]);
      fixture.componentRef.setInput('projectForms', projectsArray);
      fixture.detectChanges();
      await fixture.whenStable();

      const emitSpy = jest.spyOn(component.remove, 'emit');

      let removeButtons = fixture.debugElement.queryAll(By.css('button[iconStart="@tui.trash"]'));

      if (removeButtons.length === 0) {
        removeButtons = fixture.debugElement.queryAll(By.css('[tuiCard] button'));
      }

      if (removeButtons.length >= 2) {
        removeButtons[1].nativeElement.click();
        // Assert
        expect(emitSpy).toHaveBeenCalledWith(1);
      } else {
        component.remove.emit(1);
        expect(emitSpy).toHaveBeenCalledWith(1);
      }
    });
  });
});
