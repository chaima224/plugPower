import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRouteGuard } from './shared/guards/auth.route.guard';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SearchComponent } from './search/search/search.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AddStationComponent } from './add-station/add-station.component';
import { UpdateStationComponent } from './update-station/update-station.component';
import { AddBorneComponent } from './add-borne/add-borne.component';
import { UpdateBorneComponent } from './update-borne/update-borne.component';
import { ListStationComponent } from './list-station/list-station.component';
import { ListborneComponent } from './listborne/listborne.component';
import { UIBorneComponent } from './uiborne/uiborne.component';

const routes: Routes = [
  // {path: '' ,
  //loadChildren: () => import('./landingpage/landingpage.module').then(_=>_.landingpageModule)},
  {
    path: '',
    component: LandingpageComponent,
  },
  {
    path: 'liststation',
    component: ListStationComponent,
  },
  {
    path: 'listborne',
    component: ListborneComponent,
  },
  {
    path: 'UtilisateurBorne',
    component: UIBorneComponent,
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./Authentification/login/login.module').then(
        (_) => _.LoginModule
      ),
  },

  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((_) => _.RegisterModule),
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((_) => _.DashboardModule),
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map/map.module').then((_) => _.MapModule),
  },
  {
    path: 'borne',
    loadChildren: () =>
      import('./borne/borne.module').then((_) => _.BorneModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search/search.module').then((_) => _.SearchModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admindashboard/admindashboard.module').then(
        (_) => _.AdmindashboardModule
      ),
  },
  {
    path: 'addstation',
    loadChildren: () =>
      import('./add-station/add-station.module').then(
        (_) => _.AddStationModule
      ),
  },

  {
    path: 'updatestation/:id',
    loadChildren: () =>
      import('./update-station/update-station.module').then(
        (_) => _.UpdateStationModule
      ),
  },

  {
    path: 'addborne',
    loadChildren: () =>
      import('./add-borne/add-borne.module').then((_) => _.AddBorneModule),
  },
  {
    path: 'updateborne/:id',
    loadChildren: () =>
      import('./update-borne/update-borne.module').then(
        (_) => _.UpdateBorneModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
