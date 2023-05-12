import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BorneComponent } from "./borne.component";

const routes:Routes=[
    {
        path:'',
        component:BorneComponent
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
export class BorneRouteModule{}