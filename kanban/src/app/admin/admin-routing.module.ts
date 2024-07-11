import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inventory',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    redirectTo: 'inventory',
    pathMatch: 'full',
    // loadComponent: () =>
    //   import('./dashboard/dashboard.component').then(
    //     (c) => c.DashboardComponent
    //   ),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('../admin/inventory/inventory.module').then(
        (m) => m.InventoryModule
      ),
  },
  {
    path: 'suppliers',
    loadChildren: () =>
      import('./suppliers/suppliers.module').then((m) => m.SuppliersModule),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },

  {
    path: 'others',
    loadComponent: () =>
      import('./others/others.component').then((c) => c.OthersComponent),
  },
  {
    path: 'managestore',
    loadChildren: () =>
      import('./store/store.module').then((m) => m.StoreModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
