import { NgModule } from "@angular/core";
import { AddBorneRouteModule } from "./add-borne.route.module";
import { FormsModule } from "@angular/forms";
import { AddBorneComponent } from "./add-borne.component";





@NgModule({
    imports:[
      AddBorneRouteModule,
        FormsModule
    ],
    declarations:[
    AddBorneComponent
    ]
})
export class AddBorneModule {}