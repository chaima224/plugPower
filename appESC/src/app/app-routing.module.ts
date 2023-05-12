import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRouteGuard } from './shared/guards/auth.route.guard';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SearchComponent } from './search/search/search.component';



const routes: Routes = [
 // {path: '' , 
  //loadChildren: () => import('./landingpage/landingpage.module').then(_=>_.landingpageModule)},
  {
    path:'',
    component: LandingpageComponent
  },
 

  {path: "login" , 
  loadChildren: () => import('./Authentification/login/login.module').then(_=>_.LoginModule), 
 },
  
  {path: "register" , 
  loadChildren: () => import('./register/register.module').then(_=>_.RegisterModule)},
  {path: "dashboard" , 
  loadChildren: () => import('./dashboard/dashboard.module').then(_=>_.DashboardModule),
 },
 {path: "map" , 
  loadChildren: () => import('./map/map/map.module').then(_=>_.MapModule),
 },
 {path: "borne" , 
  loadChildren: () => import('./borne/borne.module').then(_=>_.BorneModule), 
 },
 {path: "search" , 
 loadChildren: () => import('./search/search/search.module').then(_=>_.SearchModule), 
},
  

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
