import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApprouvedStationComponent } from './approuved-station.component';
import { ApprouvedStationRouteModule } from './approuved-station.route.module';

@NgModule({
  imports: [ApprouvedStationRouteModule, FormsModule],
  declarations: [ApprouvedStationComponent],
})
export class ApprouvedStationModule {}
