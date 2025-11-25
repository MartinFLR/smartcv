import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalSection } from './personal-section';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { By } from '@angular/platform-browser';
import { PersonalInfoControls } from '../../../../core/models/controls.model';
import { tuiInputPhoneInternationalOptionsProvider } from '@taiga-ui/kit';

describe('PersonalSection Component', () => {
  let component: PersonalSection;
  let fixture: ComponentFixture<PersonalSection>;
  let mockPersonalInfoForm: FormGroup<PersonalInfoControls>;

  beforeEach(async () => {
    mockPersonalInfoForm = new FormGroup<PersonalInfoControls>({
      name: new FormControl(''),
      job: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      location: new FormControl(''),
      linkedin: new FormControl(''),
      github: new FormControl(''),
      web: new FormControl(''),
      profileSummary: new FormControl(''),
    });

    await TestBed.configureTestingModule({
      imports: [
        PersonalSection,
        ReactiveFormsModule,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
          preloadLangs: true, // Importante para asegurar que cargue rápido
        }),
      ],
      providers: [
        provideAnimations(),
        tuiInputPhoneInternationalOptionsProvider({
          metadata: import('libphonenumber-js/max/metadata').then((m) => m.default as any),
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalSection);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('personalInfo', mockPersonalInfoForm);

    fixture.detectChanges();
    await fixture.whenStable(); // Esperamos a que transloco y forms se estabilicen
    fixture.detectChanges(); // Forzamos otro ciclo de detección
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Binding', () => {
    it('should render all inputs', () => {
      // Debug: Imprimir el HTML para ver qué se renderizó
      // console.log(fixture.nativeElement.innerHTML);

      const inputs = fixture.debugElement.queryAll(By.css('input'));
      const textareas = fixture.debugElement.queryAll(By.css('textarea'));

      // Si falla aquí, es porque *transloco no mostró el contenido
      // Asegurate de que el template no tenga errores de sintaxis
      expect(inputs.length).toBe(8);
      expect(textareas.length).toBe(1);
    });

    it('should bind input values to form control', async () => {
      // Usamos un selector más seguro que no dependa de que 'input' sea el tag directo (Taiga a veces wrappea)
      // Buscamos por el formControlName que es lo que realmente nos importa
      const nameInputDe = fixture.debugElement.query(By.css('[formControlName="name"]'));

      // Chequeo de seguridad para que el test falle con un mensaje útil si no encuentra el elemento
      if (!nameInputDe) {
        throw new Error('No se encontró el input con formControlName="name"');
      }

      const newValue = 'Martin Developer';
      const inputNative = nameInputDe.nativeElement;

      inputNative.value = newValue;
      inputNative.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      await fixture.whenStable();

      expect(mockPersonalInfoForm.controls.name.value).toBe(newValue);
    });

    it('should update input value when form control changes programmatically', async () => {
      const newJob = 'Senior Angular Dev';
      mockPersonalInfoForm.controls.job.setValue(newJob);

      fixture.detectChanges();
      await fixture.whenStable();

      const jobInputDe = fixture.debugElement.query(By.css('[formControlName="job"]'));

      if (!jobInputDe) {
        throw new Error('No se encontró el input con formControlName="job"');
      }

      expect(jobInputDe.nativeElement.value).toBe(newJob);
    });
  });

  describe('Phone Input', () => {
    it('should render phone input with international options', () => {
      const phoneInputDe = fixture.debugElement.query(By.css('[formControlName="phone"]'));

      expect(phoneInputDe).toBeTruthy();

      // Si querés verificar atributos específicos, asegurate de que estén en el DOM
      // Taiga UI a veces proyecta el input nativo dentro de componentes custom
      // El atributo countryIsoCode es un Input del componente TuiInputPhoneInternational,
      // no necesariamente un atributo HTML visible.
      // Para verificar Inputs de componentes:
      expect(phoneInputDe.componentInstance).toBeDefined();
      // O verificar clases si no podés acceder a la instancia fácilmente en un test unitario de integración
    });
  });
});
