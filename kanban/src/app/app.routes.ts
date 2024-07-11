import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { adminGuard } from './shared/guard/admin.guard';
import { userGuard } from './shared/guard/user.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate:[userGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    canActivate:[adminGuard],
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    loadChildren: () =>
      import('./admin/admin-routing.module').then((m) => m.AdminRoutingModule),
  },
];
