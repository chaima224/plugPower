import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApprouvedBorneComponent } from './approuved-borne.component';
import { ApprouvedBorneRouteModule } from './approuved-borne.route.module';

@NgModule({
  imports: [ApprouvedBorneRouteModule, FormsModule],
  declarations: [ApprouvedBorneComponent],
})
export class ApprouvedBorneModule {}
