import { TuiRoot } from "@taiga-ui/core";
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from '../navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TuiRoot, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('smartcv');
}
