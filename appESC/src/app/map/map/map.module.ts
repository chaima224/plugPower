import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { MapRouteModule } from './map.route.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ng2CompleterModule } from 'ng2-completer';

@NgModule({
  imports: [MapRouteModule, FormsModule, CommonModule, Ng2CompleterModule],
  declarations: [MapComponent],
})
export class MapModule {}
