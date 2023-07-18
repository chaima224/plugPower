import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddStationComponent } from './add-station.component';
import { AddStationRouteModule } from './add-station.route.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [AddStationRouteModule, FormsModule, CommonModule],
  declarations: [AddStationComponent],
})
export class AddStationModule {}
