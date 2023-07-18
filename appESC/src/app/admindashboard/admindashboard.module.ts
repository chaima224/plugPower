import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importez le CommonModule
import { FormsModule } from '@angular/forms';
import { AdmindashboardComponent } from './admindashboard.component';
import { AdmindashboardRouteModule } from './admindashboard.route.module';

@NgModule({
  imports: [CommonModule, AdmindashboardRouteModule, FormsModule], // Ajoutez CommonModule ici
  declarations: [AdmindashboardComponent],
})
export class AdmindashboardModule {}
