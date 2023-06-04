import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprouvedBorneComponent } from './approuved-borne.component';

const routes: Routes = [
  {
    path: '',
    component: ApprouvedBorneComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprouvedBorneRouteModule {}
