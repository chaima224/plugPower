import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateStationComponent } from "./update-station.component";




const routes:Routes=[
    {
        path:'',
        component: UpdateStationComponent
    }
]
@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]

})
export class UpdateStationRouteModule{}