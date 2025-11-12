import { TUI_DARK_MODE, TuiRoot } from '@taiga-ui/core';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TuiRoot, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('smartcv');
  protected readonly darkMode = inject(TUI_DARK_MODE);
}
