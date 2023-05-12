import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { landingpageRouteModule } from "./landingpage.route.module";
import { LandingpageComponent } from "./landingpage.component";


@NgModule({
    imports:[landingpageRouteModule],
    declarations:[
        LandingpageComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ajoutez cette ligne pour inclure CUSTOM_ELEMENTS_SCHEMA
})
export class landingpageModule{}