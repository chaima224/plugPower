import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprouvedStationComponent } from './approuved-station.component';

const routes: Routes = [
  {
    path: '',
    component: ApprouvedStationComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprouvedStationRouteModule {}
