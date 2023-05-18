import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddStationComponent } from "./add-station.component";



const routes:Routes=[
    {
        path:'',
        component: AddStationComponent
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
export class AddStationRouteModule{}