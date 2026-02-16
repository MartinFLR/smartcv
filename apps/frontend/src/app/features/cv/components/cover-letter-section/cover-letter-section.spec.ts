import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { signal, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { CoverLetterSection } from './cover-letter-section';
import { CoverAnalysisService } from './analysis/cover-analysis.service';
interface MockCoverAnalysisServiceType {
  form: FormGroup;
  iaForm: FormGroup;
  isInternalReference: WritableSignal<boolean>;
  isApplicationForm: WritableSignal<boolean>;
  isLoading: WritableSignal<boolean>;
  generatedLetter: WritableSignal<string>;
  generate: jest.Mock;
}
describe('CoverLetterSection', () => {
  let component: CoverLetterSection;
  let fixture: ComponentFixture<CoverLetterSection>;
  let mockService: MockCoverAnalysisServiceType;
  beforeEach(async () => {
    mockService = {
      form: new FormGroup({
        recruiterName: new FormControl(''),
        companyName: new FormControl(''),
        referralName: new FormControl(''),
        tone: new FormControl(0),
        deliveryChannel: new FormControl(0),
      }),
      iaForm: new FormGroup({
        jobDescription: new FormControl(''),
      }),
      isInternalReference: signal(false),
      isApplicationForm: signal(false),
      isLoading: signal(false),
      generatedLetter: signal(''),
      generate: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [
        CoverLetterSection,
        ReactiveFormsModule,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [{ provide: CoverAnalysisService, useValue: mockService }],
    }).compileComponents();
    fixture = TestBed.createComponent(CoverLetterSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });
  describe('Renderizado de UI y Lógica de Negocio', () => {
    it('debe renderizar los campos base del formulario (Reclutador y Empresa)', () => {
      const recruiterInput = fixture.debugElement.query(By.css('#recruiterNameInput'));
      const companyInput = fixture.debugElement.query(By.css('#companyNameInput'));
      expect(recruiterInput).toBeTruthy();
      expect(companyInput).toBeTruthy();
    });
    it('debe mostrar el input de "Referente Interno" SOLO cuando la signal isInternalReference es true', () => {
      let referralInput = fixture.debugElement.query(By.css('#referralNameInput'));
      expect(referralInput).toBeNull();
      mockService.isInternalReference.set(true);
      fixture.detectChanges();
      referralInput = fixture.debugElement.query(By.css('#referralNameInput'));
      expect(referralInput).toBeTruthy();
    });
    it('debe renderizar correctamente las opciones de Tono', () => {
      const toneInputs = fixture.debugElement.queryAll(By.css('input[formControlName="tone"]'));
      expect(toneInputs.length).toBeGreaterThan(0);
      const allChipLabels = fixture.debugElement.queryAll(By.css('label[tuiChip]'));
      const formalLabel = allChipLabels.find((el) =>
        el.nativeElement.textContent.includes('cv.coverLetter.tone.formal.name'),
      );
      expect(formalLabel).toBeTruthy();
    });
  });
  describe('Interacciones del Usuario', () => {
    it('debe llamar a service.generate() al hacer click en el botón "Generar carta"', () => {
      const generateBtn = fixture.debugElement.query(By.css('button[tuiButton]'));
      generateBtn.nativeElement.click();
      expect(mockService.generate).toHaveBeenCalledTimes(1);
    });
    it('el botón de generar debe estar deshabilitado si iaForm es inválido', () => {
      mockService.iaForm.setErrors({ required: true });
      fixture.detectChanges();
      const generateBtn = fixture.debugElement.query(By.css('button[tuiButton]'));
      expect(generateBtn.nativeElement.disabled).toBe(true);
    });
    it('debe pasar el estado de loading al botón cuando el servicio está cargando', () => {
      mockService.isLoading.set(true);
      fixture.detectChanges();
      const btnDebug = fixture.debugElement.query(By.css('button[tuiButton]'));
      expect(btnDebug.componentInstance.loading).toBe(true);
    });
  });
  describe('Visualización de Resultados', () => {
    it('debe mostrar la carta generada en el textarea de solo lectura', () => {
      const mockLetter = 'Texto de prueba generado...';
      mockService.generatedLetter.set(mockLetter);
      fixture.detectChanges();
      const allTextareas = fixture.debugElement.queryAll(By.css('textarea'));
      expect(allTextareas.length).toBeGreaterThanOrEqual(2);
      const resultTextarea = allTextareas[allTextareas.length - 1];
      expect(resultTextarea.nativeElement.value).toBe(mockLetter);
    });
  });
});
