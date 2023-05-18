import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpdateBorneRouteModule } from './update-borne.route.module';
import { UpdateBorneComponent } from './update-borne.component';

@NgModule({
  imports: [UpdateBorneRouteModule, FormsModule],
  declarations: [UpdateBorneComponent],
})
export class UpdateBorneModule {}
