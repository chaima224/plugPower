import { NgModule } from '@angular/core';
import { AddBorneRouteModule } from './add-borne.route.module';
import { FormsModule } from '@angular/forms';
import { AddBorneComponent } from './add-borne.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [AddBorneRouteModule, FormsModule, CommonModule],
  declarations: [AddBorneComponent],
})
export class AddBorneModule {}
