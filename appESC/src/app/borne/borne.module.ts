import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { BorneComponent } from "./borne.component";
import { BorneRouteModule } from "./borne.route.module";




@NgModule({
    imports:[
       BorneRouteModule,
        FormsModule
    ],
    declarations:[
      BorneComponent
    ]
})
export class BorneModule {}