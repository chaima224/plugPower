import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { landingpageRouteModule } from './landingpage.route.module';
import { LandingpageComponent } from './landingpage.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [landingpageRouteModule, CommonModule],
  declarations: [LandingpageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajoutez cette ligne pour inclure CUSTOM_ELEMENTS_SCHEMA
})
export class landingpageModule {}
