import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdmindashboardComponent } from './admindashboard.component';
import { AdmindashboardRouteModule } from './admindashboard.route.module';

@NgModule({
  imports: [AdmindashboardRouteModule, FormsModule],
  declarations: [AdmindashboardComponent],
})
export class AdmindashboardModule {}
