import { Routes } from '@angular/router';
import { HomeAvisosPage } from './pages/home-avisos/home-avisos.page';
import { CrearAvisoPage } from './pages/crear-aviso/crear-aviso.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-avisos',
    pathMatch: 'full',
  },
  {
    path: 'home-avisos',
    component: HomeAvisosPage,
  },
  {
    path: 'crear-aviso',
    component: CrearAvisoPage,
  },
];