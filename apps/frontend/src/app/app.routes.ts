import { Routes } from '@angular/router';
import { Config } from './features/config/config';
import { Home } from './features/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'SmartCV - Resume Generator',
  },
  {
    path: 'configuracion',
    component: Config,
    title: 'SmartCV - Configuración',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
