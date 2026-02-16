import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { RouterTestingModule } from '@angular/router/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TUI_DARK_MODE } from '@taiga-ui/core';
import { Component, signal, WritableSignal } from '@angular/core';
import { Navbar } from './layout/navbar/navbar';
import { provideRouter } from '@angular/router';
import { TranslocoTestingModule } from '@jsverse/transloco';
@Component({ selector: 'app-navbar', template: '' })
class MockNavbar {}
describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;
  let darkModeSignalMock: WritableSignal<boolean>;
  beforeEach(async () => {
    darkModeSignalMock = signal(false);
    await TestBed.configureTestingModule({
      imports: [
        App,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [
        provideRouter([]),
        provideAnimations(),
        { provide: TUI_DARK_MODE, useValue: darkModeSignalMock },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
  it('should verify structural integrity (Navbar and RouterOutlet)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
  it('should correctly bind tuiTheme attribute based on dark mode signal', () => {
    const rootElement = fixture.nativeElement as HTMLElement;
    expect(rootElement.querySelector('tui-root')?.getAttribute('tuiTheme')).toBeNull();
    darkModeSignalMock.set(true);
    fixture.detectChanges();
    expect(rootElement.querySelector('tui-root')?.getAttribute('tuiTheme')).toBe('dark');
  });
});
