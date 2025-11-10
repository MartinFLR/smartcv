import { Routes } from '@angular/router';
import { Config } from './pages/config/config';
import { Home } from './pages/home/home';

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
