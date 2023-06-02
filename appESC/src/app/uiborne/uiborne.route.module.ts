import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UIBorneComponent } from './uiborne.component';

const routes: Routes = [
  {
    path: '',
    component: UIBorneComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UIBorneRouteModule {}
