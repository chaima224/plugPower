import { NgModule } from "@angular/core";
import { MapComponent } from "./map.component";
import { MapRouteModule } from "./map.route.module";
import { FormsModule } from '@angular/forms';



@NgModule({
    imports:[
        MapRouteModule,
        FormsModule,
    
        
    ],
    declarations:[
        MapComponent
    ]
})
export class MapModule {}