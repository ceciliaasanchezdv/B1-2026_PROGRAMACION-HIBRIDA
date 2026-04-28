import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'gestionar-citas',
    loadComponent: () => import('./pages/gestionar-citas/gestionar-citas.page').then( m => m.GestionarCitasPage)
  },
  {
    path: 'configuracion',
    loadComponent: () => import('./pages/configuracion/configuracion.page').then( m => m.ConfiguracionPage)
  },
];