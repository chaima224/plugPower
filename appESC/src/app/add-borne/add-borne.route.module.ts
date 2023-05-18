import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddBorneComponent } from "./add-borne.component";



const routes:Routes=[
    {
        path:'',
        component: AddBorneComponent
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
export class AddBorneRouteModule{}