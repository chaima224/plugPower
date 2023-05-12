import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './shared/services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterModule } from './register/register.module';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { sequence } from '@angular/animations';
import { SearchComponent } from './search/search/search.component';
import { BorneRouteModule } from './borne/borne.route.module';
import { MapRouteModule } from './map/map/map.route.module';
import { BorneModule } from './borne/borne.module';
import { MapModule } from './map/map/map.module';
import { SearchModule } from './search/search/search.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';









@NgModule({
  declarations: [
    AppComponent,
   LandingpageComponent,
   

 

   /* LoginComponent,
    RegisterComponent,*/
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RegisterModule,
    MapModule,
    BorneModule,
    SearchModule,
    BrowserAnimationsModule


 
  
  ],
  providers: [AuthService, AppRoutingModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ajoutez cette ligne pour inclure CUSTOM_ELEMENTS_SCHEMA
})
export class AppModule { }
