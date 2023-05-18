import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { AddStationComponent } from "./add-station.component";
import { AddStationRouteModule } from "./add-station.route.module";




@NgModule({
    imports:[
      AddStationRouteModule,
        FormsModule
    ],
    declarations:[
    AddStationComponent
    ]
})
export class AddStationModule {}