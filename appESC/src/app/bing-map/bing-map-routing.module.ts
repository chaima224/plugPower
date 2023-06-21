import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BingMapComponent } from './bing-map/bing-map.component';

const routes: Routes = [
  {
    path: '',
    component: BingMapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BingMapRoutingModule {}
