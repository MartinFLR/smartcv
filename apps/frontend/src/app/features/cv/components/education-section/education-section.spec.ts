import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationSection } from './education-section';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { By } from '@angular/platform-browser';
import { jest } from '@jest/globals';
import { EducationControls } from '../../../../core/models/controls.model';

describe('EducationSection', () => {
  let component: EducationSection;
  let fixture: ComponentFixture<EducationSection>;

  // --- Helper para crear datos de prueba ---
  const createEducationGroup = (data?: Partial<{ institution: string; title: string }>) => {
    return new FormGroup<EducationControls>({
      institution: new FormControl(data?.institution ?? ''),
      title: new FormControl(data?.title ?? ''),
      dateIn: new FormControl(''),
      dateFin: new FormControl(''),
      bullets: new FormControl(''),
    });
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EducationSection,
        ReactiveFormsModule,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [
        provideAnimations(), // Requerido por los componentes de Taiga UI
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationSection);
    component = fixture.componentInstance;

    // 1. Inicializamos el Input Requerido con un array vacío por defecto
    fixture.componentRef.setInput('educationForms', new FormArray([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render 0 items when form array is empty', () => {
      const controls = component.getEducationsControls();
      expect(controls.length).toBe(0);

      // Buscamos las tarjetas (TuiCard) o inputs. No debería haber ninguno.
      const items = fixture.debugElement.queryAll(By.css('[tuiCard]')); // Asumiendo que usas TuiCard por item
      expect(items.length).toBe(0);
    });

    it('should render correct number of items when form array has data', () => {
      // Arrange
      const educationArray = new FormArray([
        createEducationGroup({ institution: 'Universidad A' }),
        createEducationGroup({ institution: 'Universidad B' }),
      ]);

      // Act
      fixture.componentRef.setInput('educationForms', educationArray);
      fixture.detectChanges();

      // Assert
      const controls = component.getEducationsControls();
      expect(controls.length).toBe(2);

      const inputs = fixture.debugElement.queryAll(By.css('input'));
      expect(inputs.length).toBeGreaterThan(0);
    });
  });

  describe('Interactions (Outputs)', () => {
    it('should emit "add" event when the Add button is clicked', () => {
      // Arrange
      const emitSpy = jest.spyOn(component.add, 'emit');

      const buttons = fixture.debugElement.queryAll(By.css('button'));

      // Asumimos que el botón de "Agregar Educación" es el último o único visible si está vacío
      const addButton = buttons[buttons.length - 1];

      // Act
      addButton.nativeElement.click();

      // Assert
      expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit "remove" event with index when Remove button is clicked', () => {
      // Arrange
      const educationArray = new FormArray([
        createEducationGroup({ institution: 'UBA' }), // Index 0
        createEducationGroup({ institution: 'UTN' }), // Index 1
      ]);
      fixture.componentRef.setInput('educationForms', educationArray);
      fixture.detectChanges();

      const emitSpy = jest.spyOn(component.remove, 'emit');

      component.remove.emit(1);
      expect(emitSpy).toHaveBeenCalledWith(1);
    });
  });
});
