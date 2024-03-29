import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStationComponent } from './list-station/list-station.component';
import { ListborneComponent } from './listborne/listborne.component';
import { UIBorneComponent } from './uiborne/uiborne.component';

import { StationDetailsComponent } from './station-details/station-details.component';
import { AddDisponibiliteComponent } from './add-disponibilite/add-disponibilite.component';
import { BdetailsComponent } from './bdetails/bdetails.component';
import { SearchStationComponent } from './search-station/search-station.component';
import { AfficheSearchComponent } from './affiche-search/affiche-search.component';
import { ListEvaluationComponent } from './list-evaluation/list-evaluation.component';
import { ApprouvedEvaluationComponent } from './approuved-evaluation/approuved-evaluation.component';
import { UserGuard } from './shared/guards/user.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { GuestGuard } from './shared/guards/guest.guard';

const routes: Routes = [
  // {path: '' ,
  //loadChildren: () => import('./landingpage/landingpage.module').then(_=>_.landingpageModule)},

  {
    path: 'liststation',
    component: ListStationComponent,
  },
  {
    path: 'listborne',
    component: ListborneComponent,
  },
  {
    path: 'listEvaluation',
    component: ListEvaluationComponent,
  },
  {
    path: 'UtilisateurBorne',
    component: UIBorneComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'add-disponibilite',
    component: AddDisponibiliteComponent,
  },

  {
    path: 'Station-details/:id',
    component: StationDetailsComponent,
  },
  {
    path: 'bornedetails/:idStation/:idBorne',
    component: BdetailsComponent,
  },
  {
    path: 'searchStation',
    component: SearchStationComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'resultSearch',
    component: AfficheSearchComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'ApprouvedEvaluation/:id',
    component: ApprouvedEvaluationComponent,
  },

  {
    path: '',
    loadChildren: () =>
      import('./landingpage/landingpage.module').then(
        (_) => _.landingpageModule
      ),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./Authentification/login/login.module').then(
        (_) => _.LoginModule
      ),
    //canActivate: [GuestGuard],
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
    canActivate: [UserGuard],
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
    canActivate: [AdminGuard],
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

  {
    path: 'ApprouvedBorne/:id',
    loadChildren: () =>
      import('./approuved/approuved-borne.module').then(
        (_) => _.ApprouvedBorneModule
      ),
  },
  {
    path: 'ApprouvedStation/:id',
    loadChildren: () =>
      import('./approuved-station/approuved-station.module').then(
        (_) => _.ApprouvedStationModule
      ),
  },
  {
    path: 'Bing',
    loadChildren: () =>
      import('./bing-map/bing-map.module').then((_) => _.BingMapModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
