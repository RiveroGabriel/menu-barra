import { Routes } from '@angular/router';

export const routes: Routes = [
  // Carga el componente del menú al entrar a la app
  {
    path: '',
    loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent),
  },
];
