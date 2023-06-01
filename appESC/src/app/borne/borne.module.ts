import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BorneComponent } from './borne.component';
import { BorneRouteModule } from './borne.route.module';

@NgModule({
  imports: [BorneRouteModule, FormsModule, ReactiveFormsModule],
  declarations: [BorneComponent],
})
export class BorneModule {}
