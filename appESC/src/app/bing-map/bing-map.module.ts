import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BingMapRoutingModule } from './bing-map-routing.module';
import { BingMapComponent } from './bing-map/bing-map.component';
import { MapModule } from 'angular-maps';

@NgModule({
  declarations: [BingMapComponent],
  imports: [CommonModule, BingMapRoutingModule, MapModule.forRootBing()],
})
export class BingMapModule {}
