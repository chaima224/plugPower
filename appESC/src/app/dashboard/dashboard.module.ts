import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRouteModule } from './dashboard.route.module';



@NgModule({
  declarations: [ DashboardComponent],
  imports: [
      DashboardRouteModule
  ]
})
export class DashboardModule { }
