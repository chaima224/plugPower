import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UIBorneComponent } from './uiborne.component';
import { UIBorneRouteModule } from './uiborne.route.module';

@NgModule({
  imports: [UIBorneRouteModule],
  declarations: [UIBorneComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajoutez cette ligne pour inclure CUSTOM_ELEMENTS_SCHEMA
})
export class UIBorneModule {}
