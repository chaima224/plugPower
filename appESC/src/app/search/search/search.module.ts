import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { SearchComponent } from "./search.component";
import { SearchRouteModule } from "./search.route.module";




@NgModule({
    imports:[
        SearchRouteModule,
        FormsModule
    ],
    declarations:[
        SearchComponent
    ]
})
export class SearchModule {}