import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from "./register.component";
import { RegisterRouteModule } from "./register.route.module";




@NgModule({
    imports:[
        RegisterRouteModule,
        FormsModule
    ],
    declarations:[
        RegisterComponent
    ]
})
export class RegisterModule {}