import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'manage',
    loadComponent: () =>
      import('./manage/manage.component').then((c) => c.ManageComponent),
  },
  {
    path: 'manage:id',
    loadComponent: () =>
      import('./manage/manage.component').then((c) => c.ManageComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
