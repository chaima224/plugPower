import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateBorneComponent } from './update-borne.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateBorneComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateBorneRouteModule {}
