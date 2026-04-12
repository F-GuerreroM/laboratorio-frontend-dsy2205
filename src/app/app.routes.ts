import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',    
    loadComponent: () => import('./modules/auth/pages/login/login').then(m => m.LoginComponent)
  },
  {    
    path: 'auth/recuperar',
    loadComponent: () => import('./modules/auth/pages/recuperar/recuperar').then(m => m.RecuperarComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./modules/dashboard/pages/index/index').then(m => m.DashboardIndexComponent)
  },
  {
    path: 'perfil/editar',
    loadComponent: () => import('./modules/dashboard/pages/index/editar-perfil/editar-perfil').then(m => m.EditarPerfilComponent)
  },
  {
    path: 'citas/agregar/:idLab',
    loadComponent: () => import('./modules/dashboard/pages/agregar-cita/agregar-cita').then(m => m.AgregarCitaComponent)
  },
  {    
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {    
    path: '**',
    redirectTo: 'login'
  }
];