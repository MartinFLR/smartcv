import { Routes } from '@angular/router';
import { Config } from './features/config/config';
import { CvPage } from './features/cv/pages/cv-page/cv-page';

export const routes: Routes = [
  {
    path: '',
    component: CvPage,
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
