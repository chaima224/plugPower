import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpdateStationComponent } from './update-station.component';
import { UpdateStationRouteModule } from './update-station.route.module';

@NgModule({
  imports: [UpdateStationRouteModule, FormsModule],
  declarations: [UpdateStationComponent],
})
export class UpdateStationModule {}
