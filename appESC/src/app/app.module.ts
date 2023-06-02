import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './shared/services/auth.service';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterModule } from './register/register.module';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { BorneModule } from './borne/borne.module';
import { MapModule } from './map/map/map.module';
import { SearchModule } from './search/search/search.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdmindashboardModule } from './admindashboard/admindashboard.module';
import { AddStationComponent } from './add-station/add-station.component';
import { UpdateStationComponent } from './update-station/update-station.component';
import { AddStationModule } from './add-station/add-station.module';
import { UpdateStationModule } from './update-station/update-station.module';
import { AddBorneComponent } from './add-borne/add-borne.component';
import { AddBorneModule } from './add-borne/add-borne.module';
import { UpdateBorneComponent } from './update-borne/update-borne.component';
import { ListStationComponent } from './list-station/list-station.component';
import { UpdateBorneModule } from './update-borne/update-borne.module';
import { StationService } from './shared/services/station.service';
import { MyInterceptor } from './shared/MyInterceptor';
import { ListborneComponent } from './listborne/listborne.component';
import { UIBorneComponent } from './uiborne/uiborne.component';
import { landingpageModule } from './landingpage/landingpage.module';
import { UIBorneModule } from './uiborne/uiborne.module';
import { ApprouvedBorneComponent } from './approuved-borne/approuved-borne.component';
import { ApprouvedBorneModule } from './approuved-borne/approuved-borne.module';
import { ApprouvedStationComponent } from './approuved-station/approuved-station.component';
import { ApprouvedStationModule } from './approuved-station/approuved-station.module';

@NgModule({
  declarations: [
    AppComponent,
    ListStationComponent,
    ListborneComponent,

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
    AdmindashboardModule,
    AddStationModule,
    UpdateStationModule,
    AddBorneModule,
    UpdateBorneModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    landingpageModule,
    UIBorneModule,
    ApprouvedBorneModule,
    ApprouvedStationModule,
  ],

  providers: [
    AuthService,
    StationService,
    AppRoutingModule,
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajoutez cette ligne pour inclure CUSTOM_ELEMENTS_SCHEMA
})
export class AppModule {}
