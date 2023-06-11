import { Component, OnInit } from '@angular/core';
import { Station } from '../Models/Station';
import { StationService } from '../shared/services/station.service';
import { Borne } from '../Models/Borne';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-affiche-search',
  templateUrl: './affiche-search.component.html',
  styleUrls: ['./affiche-search.component.scss'],
})
export class AfficheSearchComponent implements OnInit {
  stations: Station[] = [];
  borne: Borne = new Borne();
  constructor(
    private stationService: StationService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.stations = history.state.stations;
  }
  getStationDetails(id: string) {
    this.router.navigate(['Station-details', id]);
  }
  logout(): void {
    // Call the logout method from the authentication service
    this.authService.logoutUser();
  }
}
