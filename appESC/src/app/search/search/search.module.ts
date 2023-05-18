import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { SearchComponent } from "./search.component";
import { SearchRouteModule } from "./search.route.module";
import { CommonModule } from '@angular/common';



@NgModule({
    imports:[
        SearchRouteModule,
        FormsModule,
        CommonModule
    ],
    declarations:[
        SearchComponent
    ],
  
})
export class SearchModule {}