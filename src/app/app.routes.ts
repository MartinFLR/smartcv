import { Routes } from '@angular/router';
import {Config} from './pages/config/config';
import {Home} from './pages/home/home';

export const routes: Routes = [
  {
    // Ruta para "Resume"
    path: '',
    component: Home,
    title: 'SmartCV - Resume Generator',
  },
  {
    // Ruta para "Config"
    path: 'config',
    component: Config,
    title: 'SmartCV - Configuración',
  },
  {
    // Un simple redirect por si acaso
    path: '**',
    redirectTo: '',
  },

];
